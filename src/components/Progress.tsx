import useQuestions from "../hooks/useQuestions";

function Progress() {
  const { questionsState } = useQuestions();
  const { questionIndex, questions, userPoints } = questionsState;

  const totalPoints: number = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <header className="progress">
      <progress value={questionIndex} max={questions.length} />

      <p>
        Question <strong>{questionIndex + 1}</strong> / {questions.length}
      </p>

      <p>
        <strong>
          {userPoints} / {totalPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
