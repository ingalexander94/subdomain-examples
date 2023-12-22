import { useReducer } from "react";
import { UIState } from "src/interfaces";
import { uiReducer } from "./ui.reducer";
import { UIContext } from "./ui.context";

const INITIAL_STATE: UIState = {
  checking: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UIProvider = ({ children }: Props) => {
  const [uiState, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  const toggleCheking = () => {
    dispatch({ type: "toggleChecking" });
  };

  return (
    <UIContext.Provider value={{ uiState, toggleCheking }}>
      {children}
    </UIContext.Provider>
  );
};
