import useQuestions from "../hooks/useQuestions";

function Options() {
  const { questionsState, dispatch } = useQuestions();
  const { questions, questionIndex, userAnswers } = questionsState;

  // Checks if the question at the current questionIndex has been answered by the user by checking if the userAnswers array at the questionIndex is not undefined and stores the result in the hasAnswered variable
  const hasAnswered: boolean = userAnswers[questionIndex] !== undefined;

  function handleOptionClick(optionIndex: number) {
    if (!hasAnswered) {
      dispatch({ actionType: "user_answer", userAnswerPayload: optionIndex });
    }
  }

  return (
    <div className="options">
      {questions[questionIndex].options.map((option, optionIndex) => (
        <button
          key={option}
          className={`btn btn-option ${
            userAnswers[questionIndex] === optionIndex ? "answer" : ""
          } ${
            hasAnswered
              ? questions[questionIndex].correctOption === optionIndex
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => handleOptionClick(optionIndex)}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
