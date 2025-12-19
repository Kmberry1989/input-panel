import { Panel } from "../types/panel";

export const dictationPanel: Panel = {
    id: "dictation",
    name: "Dictation",
    buttons: [
        { id: "dictate_toggle", label: "🎙️", action: "system", payload: "dictation_toggle" },
    ],
};
