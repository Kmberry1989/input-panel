
import { Panel } from "../types/panel";

export const globalPanel: Panel = {
    id: "global",
    name: "Global Controls",
    buttons: [
        { id: "copy", label: "Copy", action: "hotkey", payload: "copy" },
        { id: "paste", label: "Paste", action: "hotkey", payload: "paste" },
        { id: "select_all", label: "Select All", action: "hotkey", payload: "select_all" },
        { id: "cut", label: "Cut", action: "hotkey", payload: "cut" },
        { id: "undo", label: "Undo", action: "hotkey", payload: "undo" },
        { id: "redo", label: "Redo", action: "hotkey", payload: "redo" },
        { id: "screenshot", label: "Screenshot", action: "system", payload: "screenshot" },
        { id: "dictation", label: "🎙️ Dictate", action: "system", payload: "dictation_toggle" },
        { id: "switch", label: "App Switcher", action: "system", payload: "switcher" },
        { id: "minimize", label: "Minimize", action: "system", payload: "minimize" },
        { id: "restore", label: "Restore", action: "system", payload: "restore" },
        { id: "taskmanager", label: "Task Manager", action: "system", payload: "taskmanager" },
        { id: "close", label: "Close", action: "system", payload: "close" }
    ]
};
