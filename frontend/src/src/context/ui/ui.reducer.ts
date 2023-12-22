import { UIState } from "src/interfaces";

type UIAction = { type: "toggleChecking" };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "toggleChecking":
      return {
        ...state,
        checking: !state.checking,
      };
    default:
      return state;
  }
};
