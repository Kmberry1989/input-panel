use rdev::{listen, simulate, Button, EventType, Key};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, SystemTime};
// use tauri::Manager; // unused import

// --- Macro Data Structures ---

#[derive(Clone, Serialize, Deserialize, Debug)]
struct MacroEvent {
    event_type: String, // "key_press", "key_release", "mouse_move", "mouse_down", "mouse_up", "wait"
    key: Option<String>,
    button: Option<String>, // "left", "right", "middle"
    x: Option<f64>,
    y: Option<f64>,
    delay_ms: u64, // Time since previous event
}

#[derive(Clone)]
struct AppState {
    inner: Arc<InnerState>,
}

struct InnerState {
    is_recording: Mutex<bool>,
    recorded_events: Mutex<Vec<MacroEvent>>,
    last_event_time: Mutex<Option<SystemTime>>,
}

// --- Action Enum & Logic ---

#[derive(Debug)]
enum Action {
    Copy,
    Paste,
    Cut,
    Undo,
    Redo,
    SelectAll,
    Screenshot,
    Switcher,
    Minimize,
    Close,
    TaskManager,
    Restore,
    KeyPress(Key),
    Media(MediaKey),
    Wait(u64), // Seconds
}

#[derive(Debug)]
enum MediaKey {
    VolumeUp,
    VolumeDown,
    Mute,
    PlayPause,
    PrevTrack,
    NextTrack,
    // rdev specific mappings usually just keys, but some OS keys require special handling or might not strictly exist in rdev::Key enum depending on version.
    // For now we map strictly to valid rdev Keys if possible, or handle via dedicated logic if we were using a different crate.
    // rdev 0.5+ has VolumeUp etc.
}

impl Action {
    fn from_payload(payload: &str) -> Option<Self> {
        if let Some(rest) = payload.strip_prefix("type:") {
            let key = match rest {
                "a" => Key::KeyA,
                "b" => Key::KeyB,
                "c" => Key::KeyC,
                "d" => Key::KeyD,
                "e" => Key::KeyE,
                "f" => Key::KeyF,
                "g" => Key::KeyG,
                "h" => Key::KeyH,
                "i" => Key::KeyI,
                "j" => Key::KeyJ,
                "k" => Key::KeyK,
                "l" => Key::KeyL,
                "m" => Key::KeyM,
                "n" => Key::KeyN,
                "o" => Key::KeyO,
                "p" => Key::KeyP,
                "q" => Key::KeyQ,
                "r" => Key::KeyR,
                "s" => Key::KeyS,
                "t" => Key::KeyT,
                "u" => Key::KeyU,
                "v" => Key::KeyV,
                "w" => Key::KeyW,
                "x" => Key::KeyX,
                "y" => Key::KeyY,
                "z" => Key::KeyZ,
                "1" => Key::Num1,
                "2" => Key::Num2,
                "3" => Key::Num3,
                "4" => Key::Num4,
                "5" => Key::Num5,
                "6" => Key::Num6,
                "7" => Key::Num7,
                "8" => Key::Num8,
                "9" => Key::Num9,
                "0" => Key::Num0,
                "space" => Key::Space,
                "enter" => Key::Return,
                "backspace" => Key::Backspace,
                "escape" => Key::Escape,
                "tab" => Key::Tab,
                "capslock" => Key::CapsLock,
                "num0" => Key::Kp0,
                "num1" => Key::Kp1,
                "num2" => Key::Kp2,
                "num3" => Key::Kp3,
                "num4" => Key::Kp4,
                "num5" => Key::Kp5,
                "num6" => Key::Kp6,
                "num7" => Key::Kp7,
                "num8" => Key::Kp8,
                "num9" => Key::Kp9,
                "f1" => Key::F1,
                "f2" => Key::F2,
                "f3" => Key::F3,
                "f4" => Key::F4,
                "f5" => Key::F5,
                "f6" => Key::F6,
                "f7" => Key::F7,
                "f8" => Key::F8,
                "f9" => Key::F9,
                "f10" => Key::F10,
                "f11" => Key::F11,
                "f12" => Key::F12,
                "up" => Key::UpArrow,
                "down" => Key::DownArrow,
                "left" => Key::LeftArrow,
                "right" => Key::RightArrow,
                "home" => Key::Home,
                "end" => Key::End,
                "pageup" => Key::PageUp,
                "pagedown" => Key::PageDown,
                "delete" => Key::Delete,
                "insert" => Key::Insert,
                "shift" => Key::ShiftLeft,
                "control" => Key::ControlLeft,
                "option" => Key::Alt,
                "command" => Key::MetaLeft,
                "fn" => Key::Function,

                // Media keys
                "volume_up" => return Some(Action::Media(MediaKey::VolumeUp)),
                "volume_down" => return Some(Action::Media(MediaKey::VolumeDown)),
                "mute" => return Some(Action::Media(MediaKey::Mute)),
                "play_pause" => return Some(Action::Media(MediaKey::PlayPause)),
                "rewind" => return Some(Action::Media(MediaKey::PrevTrack)),
                "fast_forward" => return Some(Action::Media(MediaKey::NextTrack)),
                "spotlight" => Key::Unknown(0), // Special logic usage
                _ => return None,
            };
            return Some(Action::KeyPress(key));
        }

        // Wait Action
        if let Some(secs_str) = payload.strip_prefix("wait:") {
            if let Ok(secs) = secs_str.parse::<u64>() {
                return Some(Action::Wait(secs));
            }
        }

        Some(match payload {
            "copy" => Action::Copy,
            "paste" => Action::Paste,
            "cut" => Action::Cut,
            "undo" => Action::Undo,
            "redo" => Action::Redo,
            "select_all" => Action::SelectAll,
            "screenshot" => Action::Screenshot,
            "switcher" => Action::Switcher,
            "minimize" => Action::Minimize,
            "close" => Action::Close,
            "taskmanager" => Action::TaskManager,
            "restore" => Action::Restore,
            _ => return None,
        })
    }
}

fn chord(keys: &[Key]) {
    for &k in keys {
        let _ = simulate(&EventType::KeyPress(k));
    }
    for &k in keys.iter().rev() {
        let _ = simulate(&EventType::KeyRelease(k));
    }
}

fn tap(key: Key) {
    let _ = simulate(&EventType::KeyPress(key));
    let _ = simulate(&EventType::KeyRelease(key));
}

fn execute(action: Action) {
    match action {
        Action::Copy => chord(&[Key::MetaLeft, Key::KeyC]),
        Action::Paste => chord(&[Key::MetaLeft, Key::KeyV]),
        Action::Cut => chord(&[Key::MetaLeft, Key::KeyX]),
        Action::Undo => chord(&[Key::MetaLeft, Key::KeyZ]),
        Action::Redo => chord(&[Key::MetaLeft, Key::ShiftLeft, Key::KeyZ]),
        Action::SelectAll => chord(&[Key::MetaLeft, Key::KeyA]),
        Action::Screenshot => chord(&[Key::MetaLeft, Key::ShiftLeft, Key::Num3]),
        Action::Switcher => chord(&[Key::MetaLeft, Key::Tab]),
        Action::Minimize => chord(&[Key::MetaLeft, Key::KeyM]),
        Action::Close => chord(&[Key::MetaLeft, Key::KeyW]),
        Action::TaskManager => chord(&[Key::MetaLeft, Key::Alt, Key::Escape]),
        Action::Restore => chord(&[Key::MetaLeft, Key::ControlLeft, Key::KeyF]),
        Action::KeyPress(k) => {
            if let Key::Unknown(0) = k {
                // Spotlight special case: Cmd + Space
                chord(&[Key::MetaLeft, Key::Space]);
            } else {
                tap(k);
            }
        }
        Action::Media(m) => {
            println!("Media Key Not Implemented in rdev 0.5: {:?}", m);
            match m {
                MediaKey::VolumeUp => {}
                MediaKey::VolumeDown => {}
                MediaKey::Mute => {}
                MediaKey::PlayPause => {}
                MediaKey::PrevTrack => {}
                MediaKey::NextTrack => {}
            }
        }
        Action::Wait(s) => thread::sleep(Duration::from_secs(s)),
    }
}

#[tauri::command]
fn set_ignore_cursor_events(window: tauri::Window, ignore: bool) {
    let _ = window.set_ignore_cursor_events(ignore);
}

#[tauri::command]
fn trigger_action(_app: tauri::AppHandle, payload: String) {
    if let Some(action) = Action::from_payload(&payload) {
        execute(action);
    }
}

#[tauri::command]
fn configure_panel(window: tauri::Window) {
    #[cfg(target_os = "macos")]
    {
        use cocoa::appkit::{NSWindow, NSWindowCollectionBehavior};
        use cocoa::base::id;
        let ns_window = window.ns_window().unwrap() as id;
        unsafe {
            let mut style_mask = ns_window.styleMask();
            use cocoa::appkit::NSWindowStyleMask;
            // style_mask is NSWindowStyleMask (NSUInteger/bitflags)
            // We need to add NSWindowStyleMaskFullSizeContentView (1 << 15) or similar?
            // 1 << 7 is NSWindowStyleMaskUnifiedTitleAndToolbar which might be deprecated/obsolete or just value.
            // Using logic: mask | (1<<7)
            // Cocoa crate might define styleMask as a specialized type or just NSUInteger (usize/u64).
            // Error says: expected `NSWindowStyleMask`, found integer.
            // So we need to cast or use `from_bits`.

            style_mask |=
                NSWindowStyleMask::from_bits(1 << 7).unwrap_or(NSWindowStyleMask::empty());
            ns_window.setStyleMask_(style_mask);
            ns_window.setLevel_(3);
            let behavior = NSWindowCollectionBehavior::NSWindowCollectionBehaviorCanJoinAllSpaces
                | NSWindowCollectionBehavior::NSWindowCollectionBehaviorTransient
                | NSWindowCollectionBehavior::NSWindowCollectionBehaviorFullScreenAuxiliary
                | NSWindowCollectionBehavior::NSWindowCollectionBehaviorIgnoresCycle;
            ns_window.setCollectionBehavior_(behavior);
        }
    }
}

// --- Recording Commands ---

#[tauri::command]
fn start_recording(state: tauri::State<AppState>) {
    let mut is_rec = state.inner.is_recording.lock().unwrap();
    if *is_rec {
        return;
    }
    *is_rec = true;

    // Clear previous
    state.inner.recorded_events.lock().unwrap().clear();
    *state.inner.last_event_time.lock().unwrap() = Some(SystemTime::now());
}

#[tauri::command]
fn stop_recording(state: tauri::State<AppState>) -> Vec<MacroEvent> {
    let mut is_rec = state.inner.is_recording.lock().unwrap();
    *is_rec = false;
    let events = state.inner.recorded_events.lock().unwrap().clone();
    events
}

#[tauri::command]
async fn play_macro(events: Vec<MacroEvent>) {
    thread::spawn(move || {
        for event in events {
            if event.delay_ms > 0 {
                thread::sleep(Duration::from_millis(event.delay_ms));
            }

            match event.event_type.as_str() {
                "key_press" => {
                    if let Some(k_str) = event.key {
                        if let Some(k) = string_to_key(&k_str) {
                            let _ = simulate(&EventType::KeyPress(k));
                        }
                    }
                }
                "key_release" => {
                    if let Some(k_str) = event.key {
                        if let Some(k) = string_to_key(&k_str) {
                            let _ = simulate(&EventType::KeyRelease(k));
                        }
                    }
                }
                "mouse_move" => {
                    if let (Some(x), Some(y)) = (event.x, event.y) {
                        let _ = simulate(&EventType::MouseMove { x, y });
                    }
                }
                "mouse_down" => {
                    if let Some(btn_str) = event.button {
                        let btn = match btn_str.as_str() {
                            "Left" => Button::Left,
                            "Right" => Button::Right,
                            "Middle" => Button::Middle,
                            _ => Button::Left,
                        };
                        let _ = simulate(&EventType::ButtonPress(btn));
                    }
                }
                "mouse_up" => {
                    if let Some(btn_str) = event.button {
                        let btn = match btn_str.as_str() {
                            "Left" => Button::Left,
                            "Right" => Button::Right,
                            "Middle" => Button::Middle,
                            _ => Button::Left,
                        };
                        let _ = simulate(&EventType::ButtonRelease(btn));
                    }
                }
                "wait" => {
                    // delay only
                }
                _ => {}
            }
        }
    });
}

// Helper to Map String back to Key
fn string_to_key(s: &str) -> Option<Key> {
    match s {
        "KeyA" => Some(Key::KeyA),
        "KeyB" => Some(Key::KeyB),
        "KeyC" => Some(Key::KeyC),
        "KeyD" => Some(Key::KeyD),
        "KeyE" => Some(Key::KeyE),
        "KeyF" => Some(Key::KeyF),
        "KeyG" => Some(Key::KeyG),
        "KeyH" => Some(Key::KeyH),
        "KeyI" => Some(Key::KeyI),
        "KeyJ" => Some(Key::KeyJ),
        "KeyK" => Some(Key::KeyK),
        "KeyL" => Some(Key::KeyL),
        "KeyM" => Some(Key::KeyM),
        "KeyN" => Some(Key::KeyN),
        "KeyO" => Some(Key::KeyO),
        "KeyP" => Some(Key::KeyP),
        "KeyQ" => Some(Key::KeyQ),
        "KeyR" => Some(Key::KeyR),
        "KeyS" => Some(Key::KeyS),
        "KeyT" => Some(Key::KeyT),
        "KeyU" => Some(Key::KeyU),
        "KeyV" => Some(Key::KeyV),
        "KeyW" => Some(Key::KeyW),
        "KeyX" => Some(Key::KeyX),
        "KeyY" => Some(Key::KeyY),
        "KeyZ" => Some(Key::KeyZ),
        "Num1" => Some(Key::Num1),
        "Num2" => Some(Key::Num2),
        "Num3" => Some(Key::Num3),
        "Num4" => Some(Key::Num4),
        "Num5" => Some(Key::Num5),
        "Num6" => Some(Key::Num6),
        "Num7" => Some(Key::Num7),
        "Num8" => Some(Key::Num8),
        "Num9" => Some(Key::Num9),
        "Num0" => Some(Key::Num0),
        "Space" => Some(Key::Space),
        "Return" => Some(Key::Return),
        "Backspace" => Some(Key::Backspace),
        "Escape" => Some(Key::Escape),
        "Tab" => Some(Key::Tab),
        "CapsLock" => Some(Key::CapsLock),
        "ShiftLeft" => Some(Key::ShiftLeft),
        "ControlLeft" => Some(Key::ControlLeft),
        "Alt" => Some(Key::Alt),
        "MetaLeft" => Some(Key::MetaLeft),
        // Add minimal set, expand as needed for full macro support
        _ => None,
    }
}

fn main() {
    let inner = InnerState {
        is_recording: Mutex::new(false),
        recorded_events: Mutex::new(Vec::new()),
        last_event_time: Mutex::new(None),
    };

    let app_state = AppState {
        inner: Arc::new(inner),
    };
    let state_for_thread = app_state.clone();

    // Listener Thread
    thread::spawn(move || {
        if let Err(error) = listen(move |event| {
            let is_rec = state_for_thread.inner.is_recording.lock().unwrap();
            if *is_rec {
                let mut last_time = state_for_thread.inner.last_event_time.lock().unwrap();
                let now = SystemTime::now();
                let delay = match *last_time {
                    Some(t) => now
                        .duration_since(t)
                        .unwrap_or(Duration::from_millis(0))
                        .as_millis() as u64,
                    None => 0,
                };
                *last_time = Some(now);

                let (etype, key, btn, x, y) = match event.event_type {
                    EventType::KeyPress(k) => {
                        ("key_press", Some(format!("{:?}", k)), None, None, None)
                    }
                    EventType::KeyRelease(k) => {
                        ("key_release", Some(format!("{:?}", k)), None, None, None)
                    }
                    EventType::ButtonPress(b) => {
                        ("mouse_down", None, Some(format!("{:?}", b)), None, None)
                    }
                    EventType::ButtonRelease(b) => {
                        ("mouse_up", None, Some(format!("{:?}", b)), None, None)
                    }
                    EventType::MouseMove { x, y } => ("mouse_move", None, None, Some(x), Some(y)),
                    _ => return, // ignore others
                };

                state_for_thread
                    .inner
                    .recorded_events
                    .lock()
                    .unwrap()
                    .push(MacroEvent {
                        event_type: etype.to_string(),
                        key,
                        button: btn,
                        x,
                        y,
                        delay_ms: delay,
                    });
            }
        }) {
            println!("Error: {:?}", error)
        }
    });

    tauri::Builder::default()
        .manage(app_state)
        .setup(|_app| {
            #[cfg(target_os = "macos")]
            {
                use cocoa::appkit::{NSApp, NSApplication, NSApplicationActivationPolicy};
                // use tauri::Manager;
                unsafe {
                    let app_instance = NSApp();
                    app_instance.setActivationPolicy_(
                        NSApplicationActivationPolicy::NSApplicationActivationPolicyAccessory,
                    );
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            trigger_action,
            set_ignore_cursor_events,
            configure_panel,
            start_recording,
            stop_recording,
            play_macro
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
