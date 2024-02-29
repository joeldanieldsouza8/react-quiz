import { useEffect } from "react";
import useQuestions from "../hooks/useQuestions";

function Timer() {
  const { questionsState, dispatch } = useQuestions();
  const { secondsRemaining } = questionsState;

  // Check if secondsRemaining is null and set a default value (e.g., 0) if it is
  const safeSeconds = secondsRemaining ?? 0;

  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ actionType: "timer" });
      // console.log("This will run every second!"); // debug
    }, 1000);

    // Cleanup function - Clear the interval when the component is unmounted or the timer is finished (secondsRemaining === 0) to prevent memory leaks and unexpected behavior in the application
    return () => {
      console.log("Timer cleanup"); // debug
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className="timer">{`${mins}:${secs < 10 ? `0${secs}` : secs}`}</div>
  );
}

export default Timer;
