import { Panel } from "../types/panel";

export const functionKeysPanel: Panel = {
    id: "function_keys",
    name: "Function Keys",
    buttons: Array.from({ length: 12 }, (_, i) => ({
        id: `f${i + 1}`,
        label: `F${i + 1}`,
        action: "hotkey",
        payload: `type:f${i + 1}`,
    })),
};
