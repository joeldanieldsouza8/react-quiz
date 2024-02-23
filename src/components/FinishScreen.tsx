import useQuestions from "../hooks/useQuestions";

function FinishScreen() {
  const { questionsState, dispatch } = useQuestions();
  const { userPoints, questions, highscore } = questionsState;

  const totalPoints: number = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  const percentage = (userPoints / totalPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{userPoints}</strong> out of{" "}
        <strong>{totalPoints}</strong> ({Math.floor(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ actionType: "restart_quiz" })}
        >
          Restart
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
