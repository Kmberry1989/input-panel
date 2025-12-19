import { Panel } from "../types/panel";

// We will use a CSS Grid layout 
// Columns: 1..3 (Nav Block), 4 (Gap), 5..8 (Numpad)
// Rows:    1..2 (Nav Block), 3 (Gap), 4..5 (Arrow Block / Numpad start) ..

export const navigationPanel: Panel = {
    id: "navigation",
    name: "Navigation & Numpad",
    buttons: [
        // --- 3x2 Nav Block (Insert/Home/PgUp etc) ---
        // Top Row
        { id: "ins", label: "Ins", action: "hotkey", payload: "type:insert", gridColumn: "1", gridRow: "1" },
        { id: "home", label: "Home", action: "hotkey", payload: "type:home", gridColumn: "2", gridRow: "1" },
        { id: "pgup", label: "PgUp", action: "hotkey", payload: "type:pageup", gridColumn: "3", gridRow: "1" },
        // Bottom Row
        { id: "del", label: "Del", action: "hotkey", payload: "type:delete", gridColumn: "1", gridRow: "2" },
        { id: "end", label: "End", action: "hotkey", payload: "type:end", gridColumn: "2", gridRow: "2" },
        { id: "pgdn", label: "PgDn", action: "hotkey", payload: "type:pagedown", gridColumn: "3", gridRow: "2" },

        // --- Arrow Keys (Inverted T) ---
        //      Up
        // Left Down Right
        // Positioning roughly below Nav block? Or standard layout puts them lower?
        // Let's put them at Row 4 & 5.
        { id: "up", label: "↑", action: "hotkey", payload: "type:up", gridColumn: "2", gridRow: "4" },
        { id: "left", label: "←", action: "hotkey", payload: "type:left", gridColumn: "1", gridRow: "5" },
        { id: "down", label: "↓", action: "hotkey", payload: "type:down", gridColumn: "2", gridRow: "5" },
        { id: "right", label: "→", action: "hotkey", payload: "type:right", gridColumn: "3", gridRow: "5" },

        // --- Numpad (Right Side) ---
        // Standard Numpad is 4 columns wide (NumLock / / * -)
        // We'll put it starting at Column 5.

        // Row 1
        { id: "nl", label: "Num", action: "hotkey", payload: "type:numlock", gridColumn: "5", gridRow: "1" },
        { id: "div", label: "/", action: "hotkey", payload: "type:kp_slash", gridColumn: "6", gridRow: "1" },
        { id: "mul", label: "*", action: "hotkey", payload: "type:kp_multiply", gridColumn: "7", gridRow: "1" },
        { id: "sub", label: "-", action: "hotkey", payload: "type:kp_minus", gridColumn: "8", gridRow: "1" },

        // Row 2
        { id: "n7", label: "7", action: "hotkey", payload: "type:num7", gridColumn: "5", gridRow: "2" },
        { id: "n8", label: "8", action: "hotkey", payload: "type:num8", gridColumn: "6", gridRow: "2" },
        { id: "n9", label: "9", action: "hotkey", payload: "type:num9", gridColumn: "7", gridRow: "2" },
        { id: "add", label: "+", action: "hotkey", payload: "type:kp_plus", gridColumn: "8", gridRow: "2 / span 2" }, // + spans 2 rows tall traditionally? Or standard is + is tall.

        // Row 3
        { id: "n4", label: "4", action: "hotkey", payload: "type:num4", gridColumn: "5", gridRow: "3" },
        { id: "n5", label: "5", action: "hotkey", payload: "type:num5", gridColumn: "6", gridRow: "3" },
        { id: "n6", label: "6", action: "hotkey", payload: "type:num6", gridColumn: "7", gridRow: "3" },
        // + continues here if spanned

        // Row 4
        { id: "n1", label: "1", action: "hotkey", payload: "type:num1", gridColumn: "5", gridRow: "4" },
        { id: "n2", label: "2", action: "hotkey", payload: "type:num2", gridColumn: "6", gridRow: "4" },
        { id: "n3", label: "3", action: "hotkey", payload: "type:num3", gridColumn: "7", gridRow: "4" },
        { id: "ent", label: "⏎", action: "hotkey", payload: "type:kp_enter", gridColumn: "8", gridRow: "4 / span 2" }, // Enter tall

        // Row 5
        { id: "n0", label: "0", action: "hotkey", payload: "type:num0", gridColumn: "5 / span 2", gridRow: "5" }, // 0 wide
        { id: "dec", label: ".", action: "hotkey", payload: "type:kp_period", gridColumn: "7", gridRow: "5" },
    ],
};
