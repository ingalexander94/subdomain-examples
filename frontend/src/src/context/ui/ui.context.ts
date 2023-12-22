import { createContext } from "react";
import { UIState } from "src/interfaces";

export type UIContextProps = {
  uiState: UIState;
  toggleCheking: () => void;
};

export const UIContext = createContext<UIContextProps>({} as UIContextProps);
