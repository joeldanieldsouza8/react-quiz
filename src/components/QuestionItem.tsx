import useQuestions from "../hooks/useQuestions";
import Options from "./Options";
import Timer from "./Timer";

function QuestionItem() {
  const { questionsState } = useQuestions();
  const { questions, questionIndex } = questionsState;

  console.log("questions", questions); // debug
  console.log("questionIndex", questionIndex); // debug


  return (
    <div>
      <h4>{questions[questionIndex].question}</h4>

      <Options />

      <Timer />
    </div>
  );
}

export default QuestionItem;
