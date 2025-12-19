import { Panel } from "../types/panel";

export const mediaPanel: Panel = {
    id: "media",
    name: "Media & System",
    buttons: [
        { id: "vol_up", label: "🔊", action: "hotkey", payload: "type:volume_up" },
        { id: "vol_dn", label: "🔉", action: "hotkey", payload: "type:volume_down" },
        { id: "mute", label: "🔇", action: "hotkey", payload: "type:mute" },

        { id: "prev", label: "⏮", action: "hotkey", payload: "type:rewind" },
        { id: "play", label: "⏯", action: "hotkey", payload: "type:play_pause" },
        { id: "next", label: "⏭", action: "hotkey", payload: "type:fast_forward" },

        { id: "bright_up", label: "☀↑", action: "hotkey", payload: "type:brightness_up" },
        { id: "bright_dn", label: "☀↓", action: "hotkey", payload: "type:brightness_down" },

        { id: "spotlight", label: "🔍", action: "hotkey", payload: "type:spotlight" },
        { id: "sleep", label: "💤", action: "system", payload: "sleep_display" }, // Backend needs to interpret this or just log
    ],
};
