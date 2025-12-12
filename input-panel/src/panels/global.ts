
import { Panel } from "../types/panel";

export const globalPanel: Panel = {
  id: "global",
  name: "Global Controls",
  buttons: [
    { id: "copy", label: "Copy", action: "hotkey", payload: "copy" },
    { id: "paste", label: "Paste", action: "hotkey", payload: "paste" },
    { id: "undo", label: "Undo", action: "hotkey", payload: "undo" },
    { id: "redo", label: "Redo", action: "hotkey", payload: "redo" },
    { id: "screenshot", label: "Screenshot", action: "system", payload: "screenshot" },
    { id: "switch", label: "App Switcher", action: "system", payload: "switcher" },
    { id: "minimize", label: "Minimize", action: "system", payload: "minimize" },
    { id: "close", label: "Close", action: "system", payload: "close" }
  ]
};
