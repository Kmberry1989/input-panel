import { Panel } from "../types/panel";

export const modifiersPanel: Panel = {
    id: "modifiers",
    name: "Modifiers",
    buttons: [
        { id: "shift", label: "Shift", action: "hotkey", payload: "type:shift" },
        { id: "ctrl", label: "Ctrl", action: "hotkey", payload: "type:control" },
        { id: "opt", label: "Opt", action: "hotkey", payload: "type:option" },
        { id: "cmd", label: "Cmd", action: "hotkey", payload: "type:command" },
        { id: "fn", label: "Fn", action: "hotkey", payload: "type:fn" }, // Note: Fn is often hardware specific
        { id: "caps", label: "Caps", action: "hotkey", payload: "type:capslock" },
        { id: "tab", label: "Tab", action: "hotkey", payload: "type:tab" },
        { id: "esc", label: "Esc", action: "hotkey", payload: "type:escape" },
        { id: "del", label: "Del", action: "hotkey", payload: "type:delete" },
    ],
};
