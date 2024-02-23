import { useReducer } from "react";
import {
  DateCounterAction,
  DateCounterState,
  dateCounterReducer,
} from "../reducers/dateCounterReducer";

function DateCounter() {
  // const [count, setCount] = useState<number>(0);
  // const [step, setStep] = useState<number>(1);

  const initialState = { count: 0, step: 1 };

  const [state, dispatch] = useReducer<
    (state: DateCounterState, action: DateCounterAction) => DateCounterState
  >(dateCounterReducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function dec() {
    // setCount((count) => count - step);
    dispatch({ type: "DEC" });
  }

  function inc() {
    // setCount((count) => count + step);
    dispatch({ type: "INC" });
  }

  function defineCount(e: React.ChangeEvent<HTMLInputElement>) {
    // setCount(Number(e.target.value));
    dispatch({ type: "SET_COUNT", newCount: Number(e.target.value) });
  }

  function defineStep(e: React.ChangeEvent<HTMLInputElement>) {
    // setStep(Number(e.target.value));
    dispatch({ type: "SET_STEP", newStep: Number(e.target.value) });
  }

  function reset() {
    // setCount(0);
    // setStep(1);

    dispatch({ type: "RESET" });
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
