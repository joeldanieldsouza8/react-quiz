import useQuestions from "../hooks/useQuestions";

function StartScreen() {
  const { questionsState, dispatch } = useQuestions();
  const { questions } = questionsState;

  function handleStart() {
    dispatch({ actionType: "quiz/start" });
  }

  function handleDifficultyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const difficulty = event.target.value as "all" | "easy" | "medium" | "hard"; // Type assertion

    dispatch({ actionType: "option", difficultyPayload: difficulty });
  }

  function handleNumQuestionsChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const numQuestions = parseInt(event.target.value, 10);

    // Validate the number of questions
    if (
      isNaN(numQuestions) ||
      numQuestions < 1 ||
      numQuestions > questions.length
    ) {
      console.error("Invalid number of questions");
      return;
    }

    dispatch({
      actionType: "questions/amount",
      numQuestionsPayload: numQuestions,
    });
  }

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>

      <label>Choose difficulty level:</label>
      <select onChange={handleDifficultyChange}>
        <option value="all">All</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="text"
        placeholder={`Enter up to ${questions.length} questions...`}
        onChange={handleNumQuestionsChange}
        max={questions.length}
        min={1}
      />

      <button className="btn btn-ui" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
