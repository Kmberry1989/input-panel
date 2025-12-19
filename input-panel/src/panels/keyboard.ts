import { Panel } from "../types/panel";

// 30-column grid for physical layout emulation
// Standard key = 2 units.
// Row 1 (Q) offset = 0
// Row 2 (A) offset = 1 unit (0.5 key)
// Row 3 (Z) offset = 2-3 units

export const keyboardPanel: Panel = {
    id: "keyboard",
    name: "Keyboard",
    buttons: [
        // Row 1: Tab + Q..P + [] + \
        { id: "tab", label: "Tab", action: "hotkey", payload: "type:tab", gridRow: "1", gridColumn: "span 3" }, // 1.5u
        ...["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((char) => ({
            id: char,
            label: char.toUpperCase(),
            action: "hotkey" as const,
            payload: `type:${char}`,
            gridRow: "1",
            gridColumn: "span 2",
        })),
        { id: "bsp", label: "⌫", action: "hotkey", payload: "type:backspace", gridRow: "1", gridColumn: "span 3" }, // Remainder

        // Row 2: Caps + A..L + ; ' Enter
        { id: "caps", label: "Caps", action: "hotkey", payload: "type:capslock", gridRow: "2", gridColumn: "span 4" }, // 1.75u approx
        ...["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((char) => ({
            id: char,
            label: char.toUpperCase(),
            action: "hotkey" as const,
            payload: `type:${char}`,
            gridRow: "2",
            gridColumn: "span 2",
        })),
        { id: "ent", label: "⏎", action: "hotkey", payload: "type:return", gridRow: "2", gridColumn: "span 4" },

        // Row 3: Shift + Z..M + , . / Shift
        { id: "lshift", label: "Shift", action: "hotkey", payload: "type:shift", gridRow: "3", gridColumn: "span 5" }, // 2.25u
        ...["z", "x", "c", "v", "b", "n", "m"].map((char) => ({
            id: char,
            label: char.toUpperCase(),
            action: "hotkey" as const,
            payload: `type:${char}`,
            gridRow: "3",
            gridColumn: "span 2",
        })),
        { id: "rshift", label: "Shift", action: "hotkey", payload: "type:shift", gridRow: "3", gridColumn: "span 5" },

        // Row 4: Space
        // Centered spacebar. 
        // Total cols ~30. 
        // Space usually ~6-7u (12-14 grid units).
        { id: "space", label: "", action: "hotkey", payload: "type:space", gridRow: "4", gridColumn: "10 / span 12" },
    ],
};

export const numpadPanel: Panel = {
    id: "numpad",
    name: "Numpad",
    buttons: [
        { id: "num7", label: "7", action: "hotkey", payload: "type:num7" },
        { id: "num8", label: "8", action: "hotkey", payload: "type:num8" },
        { id: "num9", label: "9", action: "hotkey", payload: "type:num9", breakAfter: true },
        { id: "num4", label: "4", action: "hotkey", payload: "type:num4" },
        { id: "num5", label: "5", action: "hotkey", payload: "type:num5" },
        { id: "num6", label: "6", action: "hotkey", payload: "type:num6", breakAfter: true },
        { id: "num1", label: "1", action: "hotkey", payload: "type:num1" },
        { id: "num2", label: "2", action: "hotkey", payload: "type:num2" },
        { id: "num3", label: "3", action: "hotkey", payload: "type:num3", breakAfter: true },
        { id: "num0", label: "0", action: "hotkey", payload: "type:num0" },
        { id: "plus", label: "+", action: "hotkey", payload: "type:+" }, // Note: Backend needs mapping for symbols if not char
        // Wait, I strictly mapped a-z, num0-9. I didn't map +,-,*,/ in backend yet.
        // For now, let's stick to the mapped keys.
        { id: "enter", label: "⏎", action: "hotkey", payload: "type:enter", breakAfter: true },
    ],
};

export const functionPanel: Panel = {
    id: "function",
    name: "F-Keys & Nav",
    buttons: [
        { id: "esc", label: "Esc", action: "hotkey", payload: "type:escape" },
        ...Array.from({ length: 12 }, (_, i) => ({
            id: `f${i + 1}`,
            label: `F${i + 1}`,
            action: "hotkey" as const,
            payload: `type:f${i + 1}`,
        })),
        { id: "insert", label: "Ins", action: "hotkey", payload: "type:insert" },
        { id: "delete", label: "Del", action: "hotkey", payload: "type:delete" },
        { id: "home", label: "Home", action: "hotkey", payload: "type:home" },
        { id: "end", label: "End", action: "hotkey", payload: "type:end" },
        { id: "pgup", label: "PgUp", action: "hotkey", payload: "type:pageup" },
        { id: "pgdn", label: "PgDn", action: "hotkey", payload: "type:pagedown" },
        { id: "up", label: "↑", action: "hotkey", payload: "type:up" },
        { id: "left", label: "←", action: "hotkey", payload: "type:left" },
        { id: "down", label: "↓", action: "hotkey", payload: "type:down" },
        { id: "right", label: "→", action: "hotkey", payload: "type:right" },
    ],
};
