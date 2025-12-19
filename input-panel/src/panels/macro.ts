import { Panel } from "../types/panel";

export const macroPanel: Panel = {
    id: "macro",
    name: "Macros",
    buttons: [
        { id: "record", label: "● Rec", action: "system", payload: "macro_record" },
        { id: "stop", label: "■ Stop", action: "system", payload: "macro_stop" },
        { id: "play", label: "▶ Play", action: "system", payload: "macro_play" },
        { id: "wait", label: "⏱ Wait", action: "system", payload: "macro_wait" }, // Adds a wait to current macro? Or manual?
        // Save/Load slots will be rendered dynamically, but we define the base panel here
        { id: "save", label: "💾 Save", action: "system", payload: "macro_save" },
        { id: "load", label: "📂 Load", action: "system", payload: "macro_load" },
    ],
};
