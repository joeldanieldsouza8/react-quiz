import useQuestions from "../hooks/useQuestions";

function PreviousButton() {
  const { questionsState, dispatch } = useQuestions();
  const {questionIndex } = questionsState;

  if (questionIndex > 0) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ actionType: "question/previous" })}
      >
        Previous
      </button>
    );
  }
}

export default PreviousButton;
