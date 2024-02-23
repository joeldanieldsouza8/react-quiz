import { useContext } from "react";
import { QuestionsContext } from "../context/QuestionsContext";
import { QuestionsAction, QuestionsState } from "../reducers/questionsReducer";

function useQuestions() {
  const context = useContext<{
    questionsState: QuestionsState;
    dispatch: React.Dispatch<QuestionsAction>;
  }>(QuestionsContext);

  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }

  return context;
}

export default useQuestions;
