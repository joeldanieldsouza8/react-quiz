export interface DateCounterState {
  count: number;
  step: number;
}

export type DateCounterAction =
  | { type: "INC" }
  | { type: "DEC" }
  | { type: "SET_COUNT"; newCount: number }
  | { type: "SET_STEP"; newStep: number }
  | { type: "RESET" };

export function dateCounterReducer(
  state: DateCounterState,
  action: DateCounterAction
): DateCounterState {
  console.log("state", state); // debug
  console.log("action", action); // debug

  switch (action.type) {
    case "INC":
      return { ...state, count: state.count + state.step };

    case "DEC":
      return { ...state, count: state.count - state.step };

    case "SET_COUNT":
      return { ...state, count: action.newCount };

    case "SET_STEP":
      return { ...state, step: action.newStep };

    case "RESET":
      return { count: 0, step: 1 };

    default:
      return state;
  }
}
