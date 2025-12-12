
export type ActionType = "hotkey" | "system";

export interface PanelButton {
  id: string;
  label: string;
  action: ActionType;
  payload: string;
}

export interface Panel {
  id: string;
  name: string;
  buttons: PanelButton[];
}
