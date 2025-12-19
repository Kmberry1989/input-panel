import { invoke } from "@tauri-apps/api/core";
import { globalPanel } from "./panels/global";
import { keyboardPanel } from "./panels/keyboard";
import { clipboardPanel } from "./panels/clipboard";
import { modifiersPanel } from "./panels/modifiers";
import { mediaPanel } from "./panels/media";
import { macroPanel } from "./panels/macro";
import { functionKeysPanel } from "./panels/function";
import { navigationPanel } from "./panels/navigation";
import { dictationPanel } from "./panels/dictation";
import { Panel } from "./types/panel";

// --- Configuration ---
// Map of all available panels
const panels: Record<string, Panel> = {
  global: globalPanel,
  keyboard: keyboardPanel,
  function_keys: functionKeysPanel,
  navigation: navigationPanel,
  modifiers: modifiersPanel,
  media: mediaPanel,
  clipboard: clipboardPanel,
  macro: macroPanel,
  dictation: dictationPanel,
};

// State
type ActivePanel = {
  id: string;
  x: number;
  y: number;
  zIndex: number;
  opacity: number;
};

// Default Active Panels: Keyboard + Dictation
let activePanels: ActivePanel[] = [
  { id: "keyboard", x: 100, y: 150, zIndex: 1, opacity: 1.0 },
  { id: "dictation", x: 50, y: 50, zIndex: 2, opacity: 1.0 },
];
let highestZ = 2;

// Macro State
let isRecording = false;
let recordedEvents: any[] = [];
// Dictation State
let isDictating = false;

// DOM Elements
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <div id="top-bar">
      <input type="text" placeholder="Type here..." id="floating-input" />
  </div>
  <div id="desktop"></div>
  <div id="dock"></div>
`;

const desktop = document.getElementById("desktop")!;
const dock = document.getElementById("dock")!;
const topInput = document.getElementById("floating-input") as HTMLInputElement;

// --- Initialization ---
invoke("set_ignore_cursor_events", { ignore: true });
invoke("configure_panel");

// --- Interaction Logic ---
app.addEventListener("mouseenter", () => {
  invoke("set_ignore_cursor_events", { ignore: false });
});

app.addEventListener("mouseleave", () => {
  invoke("set_ignore_cursor_events", { ignore: true });
});

topInput.addEventListener("mousedown", (e) => {
  e.stopPropagation();
});

// --- Rendering ---

function renderDock() {
  dock.innerHTML = "";
  const dockItems = [
    { id: "keyboard", label: "⌨️" },
    { id: "dictation", label: "🎙️" },
    { id: "navigation", label: "🔢" },
    { id: "function_keys", label: "FN" }, // Updated Label
    { id: "modifiers", label: "🎛️" },
    { id: "media", label: "⏯️" },
    { id: "clipboard", label: "📋" },
    { id: "macro", label: "⏺️" },
  ];

  dockItems.forEach(item => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    const isActive = activePanels.some(p => p.id === item.id);

    btn.style.background = isActive ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)";
    btn.style.borderColor = isActive ? "white" : "transparent";

    btn.onmousedown = (e) => {
      e.preventDefault();
      togglePanel(item.id);
    };
    dock.appendChild(btn);
  });
}

function renderDesktop() {
  desktop.innerHTML = "";
  activePanels.forEach(ap => {
    const panelDef = panels[ap.id];
    if (!panelDef) return;

    const container = document.createElement("div");
    container.classList.add("panel-window");
    container.style.left = `${ap.x}px`;
    container.style.top = `${ap.y}px`;
    container.style.zIndex = `${ap.zIndex}`;
    container.style.opacity = `${ap.opacity}`;

    // Dictation Panel Special Style
    if (ap.id === "dictation") {
      container.classList.add("dictation-window");
    }

    // Header
    const header = document.createElement("div");
    header.classList.add("panel-header");

    const title = document.createElement("span");
    title.textContent = panelDef.name;
    title.style.marginRight = "auto";
    header.appendChild(title);

    // Opacity Slider
    const opacityInput = document.createElement("input");
    opacityInput.type = "range";
    opacityInput.min = "0.2";
    opacityInput.max = "1.0";
    opacityInput.step = "0.1";
    opacityInput.value = `${ap.opacity}`;
    opacityInput.style.width = "40px";
    opacityInput.style.marginRight = "5px";
    opacityInput.title = "Opacity";
    opacityInput.onmousedown = (e) => { e.stopPropagation(); };
    opacityInput.oninput = (e: any) => {
      ap.opacity = parseFloat(e.target.value);
      container.style.opacity = `${ap.opacity}`;
    };
    header.appendChild(opacityInput);

    // Close Button
    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontWeight = "bold";
    closeBtn.onmousedown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      togglePanel(ap.id);
    };
    header.appendChild(closeBtn);

    // Drag Logic
    header.onmousedown = (e) => {
      if (e.target !== header && e.target !== title) return;
      e.preventDefault();
      bringToFront(ap.id);
      startDrag(e, ap);
    };

    container.appendChild(header);

    // Content
    const content = document.createElement("div");
    content.classList.add("panel-content");

    // Specific Layout Logic
    if (ap.id === "keyboard") {
      content.style.display = "grid";
      content.style.gridTemplateColumns = "repeat(30, 1fr)";
      content.style.width = "600px";
    } else if (ap.id === "navigation") {
      content.style.display = "grid";
      content.style.gridTemplateColumns = "repeat(3, 1fr) 20px repeat(4, 1fr)";
      content.style.width = "auto";
    } else if (ap.id === "function_keys") {
      content.style.display = "grid";
      content.style.gridTemplateColumns = "repeat(12, 1fr)";
      content.style.width = "600px";
    } else if (ap.id === "clipboard") {
      content.style.flexDirection = "column";
      content.style.justifyContent = "flex-start";
      content.style.maxHeight = "300px";
      content.style.overflowY = "auto";
      content.style.width = "250px";
    }

    // Dynamic Content
    let buttons = panelDef.buttons;

    if (ap.id === "macro") {
      buttons = [
        { id: "record", label: isRecording ? "■ Stop" : "● Rec", action: "system", payload: isRecording ? "macro_stop" : "macro_record" },
        { id: "play", label: "▶ Play", action: "system", payload: "macro_play" },
        { id: "wait", label: "⏱ Wait", action: "system", payload: "macro_wait" },
        { id: "save_demo", label: "💾 Save", action: "system", payload: "macro_save" },
        { id: "load_demo", label: "📂 Load", action: "system", payload: "macro_load" },
      ];
    }
    if (ap.id === "clipboard") {
      buttons = clipboardPanel.buttons;
    }
    if (ap.id === "dictation") {
      buttons = [
        { id: "dictate_toggle", label: isDictating ? "🛑 Listening..." : "🎙️", action: "system", payload: "dictation_toggle" }
      ];
    }

    buttons.forEach(btn => {
      const b = document.createElement("button");
      b.textContent = btn.label;
      if (isRecording && ap.id === "macro" && btn.id === "record") b.style.background = "red";
      if (isDictating && ap.id === "dictation") {
        b.style.background = "red";
        b.style.width = "100%";
        b.style.height = "100%";
      }

      if (btn.gridColumn) b.style.gridColumn = btn.gridColumn;
      if (btn.gridRow) b.style.gridRow = btn.gridRow;

      if (ap.id === "clipboard") {
        b.style.width = "100%";
        b.style.textAlign = "left";
        b.style.marginBottom = "4px";
      }

      b.onmousedown = async (e) => {
        e.preventDefault();
        await handleAction(btn.payload, btn.action);
      };

      content.appendChild(b);

      if (btn.breakAfter && !['keyboard', 'navigation', 'function_keys'].includes(ap.id)) {
        const br = document.createElement("div");
        br.style.flexBasis = "100%";
        br.style.height = "0";
        content.appendChild(br);
      }
    });

    container.appendChild(content);
    desktop.appendChild(container);
  });
}

// --- Logic Helpers ---

function togglePanel(id: string) {
  const idx = activePanels.findIndex(p => p.id === id);
  if (idx >= 0) {
    activePanels.splice(idx, 1);
  } else {
    activePanels.push({ id, x: 150 + (activePanels.length * 20), y: 150 + (activePanels.length * 20), zIndex: ++highestZ, opacity: 1.0 });
  }
  renderDock();
  renderDesktop();
}

function bringToFront(id: string) {
  const p = activePanels.find(x => x.id === id);
  if (p) {
    p.zIndex = ++highestZ;
    renderDesktop();
  }
}

let dragTarget: ActivePanel | null = null;
let dragOffset = { x: 0, y: 0 };

function startDrag(e: MouseEvent, p: ActivePanel) {
  dragTarget = p;
  dragOffset.x = e.clientX - p.x;
  dragOffset.y = e.clientY - p.y;
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(e: MouseEvent) {
  if (!dragTarget) return;
  dragTarget.x = e.clientX - dragOffset.x;
  dragTarget.y = e.clientY - dragOffset.y;
  requestAnimationFrame(renderDesktop);
}

function stopDrag() {
  dragTarget = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

// --- Action Handler ---
async function handleAction(payload: string, _type: string) {
  // Check if we should type into floating input manually because we preventDefault
  if (document.activeElement === topInput) {
    if (payload.startsWith("type:")) {
      const char = payload.split(":")[1];
      if (char === "backspace") {
        topInput.value = topInput.value.slice(0, -1);
      } else if (char === "tab") {
        topInput.value += "\t";
      } else if (char === "enter") {
        // do nothing or submit?
      } else if (char === "space") {
        topInput.value += " ";
      } else if (char.length === 1) {
        topInput.value += char;
      }
    }
  }

  if (payload === "macro_record") {
    await invoke("start_recording");
    isRecording = true;
    renderDesktop();
    return;
  }
  if (payload === "macro_stop") {
    recordedEvents = await invoke("stop_recording");
    isRecording = false;
    renderDesktop();
    return;
  }
  if (payload === "macro_play") {
    if (recordedEvents.length === 0) { alert("No macro recorded!"); return; }
    await invoke("play_macro", { events: recordedEvents });
    return;
  }
  if (payload === "macro_wait") {
    // Wait logic
    return;
  }
  if (payload === "dictation_toggle") {
    toggleDictation();
    return;
  }
  await invoke("trigger_action", { payload });
}

// --- Dictation Logic ---
let recognition: any = null;
if ('webkitSpeechRecognition' in window) {
  // @ts-ignore
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = async (e: any) => {
    const text = e.results[0][0].transcript;
    await navigator.clipboard.writeText(text + " ");
    await invoke("trigger_action", { payload: "paste" });
    toggleDictation(false);
  };
  recognition.onerror = () => toggleDictation(false);
  recognition.onend = () => isDictating && toggleDictation(false);
}

function toggleDictation(force?: boolean) {
  if (!recognition) {
    alert("Speech API not supported");
    return;
  }
  const next = force !== undefined ? force : !isDictating;
  if (next === isDictating) return;
  isDictating = next;
  if (isDictating) recognition.start(); else recognition.stop();
  renderDesktop();
}

// --- Clipboard Poll ---
let clipboardHistory: string[] = [];
setInterval(async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text && text !== clipboardHistory[0]) {
      clipboardHistory.unshift(text);
      if (clipboardHistory.length > 20) clipboardHistory.pop();

      clipboardPanel.buttons = [];
      clipboardPanel.buttons.push({ id: "clear_hist", label: "Clear History", action: "system", payload: "clear_hist" });

      clipboardHistory.forEach((c, i) => {
        clipboardPanel.buttons.push({
          id: `clip_${i}`,
          label: c.length > 30 ? c.substring(0, 30) + "..." : c,
          action: "system",
          payload: `type:${c}`
        });
      });
      if (activePanels.some(p => p.id === "clipboard")) renderDesktop();
    }
  } catch (e) { }
}, 2000);

// --- Styles ---
const style = document.createElement("style");
style.textContent = `
  #app {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: none;
  }
  
  #top-bar {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: auto;
      z-index: 1000;
  }
  
  #floating-input {
      width: 60%;
      padding: 10px 20px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.2);
      background: rgba(0,0,0,0.6);
      color: white;
      font-size: 16px;
      backdrop-filter: blur(5px);
  }
  
  #desktop {
      flex: 1;
      position: relative;
      pointer-events: none;
  }
  #dock {
      height: 60px;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 10px;
      pointer-events: auto;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      backdrop-filter: blur(10px);
      margin: 0 auto;
      max-width: 80%;
  }
  
  /* Global Panel Window Styles */
  .panel-window {
      position: absolute;
      background: rgba(30,30,30, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      min-width: 150px;
      pointer-events: auto;
      display: flex;
      flex-direction: column; /* Header + Content */
      overflow: hidden;
      resize: both;
      min-height: 100px;
  }
  
  /* Dictation Specific Overrides */
  .dictation-window {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      resize: both; 
      aspect-ratio: 1 / 1;
      /* We keep resize but hide standard window chrome */
  }

  .dictation-window .panel-header {
      /* Make header minimal or invisible but draggable? */
      /* Let's keep it visible but very small overlay? */
      /* Or better: standard window but with button fully filling it. */
      /* User wanted "One big circular button". */
      /* If we hide background, we see just content. */
      background: rgba(0,0,0,0.5); /* Semi-transparent header for drag */
      border-radius: 12px 12px 0 0;
  }
  
  .dictation-window .panel-content {
      padding: 0;
      background: transparent;
      overflow: hidden; /* No scrollbars */
  }

  /* Universal Header */
  .panel-header {
      background: rgba(255,255,255,0.1);
      color: #ccc;
      padding: 6px 10px;
      font-size: 13px;
      cursor: grab;
      user-select: none;
      display: flex;
      align-items: center;
      flex-shrink: 0; /* Header size fixed */
  }
  .panel-header:active {
      cursor: grabbing;
  }
  
  .panel-content {
      padding: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: center;
      overflow: auto; /* Scroll for others */
      align-items: start;
      flex: 1; /* Take remaining space */
      width: 100%;
  }

  .panel-content button {
      flex: 1;
      min-width: 40px;
      /* Ensure grid items stretch or fit */
      width: 100%; 
      height: 100%;
      /* Force circular shape for logic handled in JS, but backup here */
  }
  
  .dictation-window button {
      border-radius: 50% !important;
  }
`;
document.head.appendChild(style);

renderDock();
renderDesktop();
