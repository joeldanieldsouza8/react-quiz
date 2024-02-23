import useQuestions from "../hooks/useQuestions";

function NextButton() {
  const { questionsState, dispatch } = useQuestions();
  const { userAnswers, questionIndex, questions } = questionsState;

  /* 
    Let's break down the expression:

    userAnswers.slice(questionIndex): This is calling the slice method on the userAnswers array. The slice method returns a shallow copy of a portion of an array into a new array object. In this case, it's creating a new array that starts from the index specified by questionIndex and includes all subsequent elements. The original userAnswers array is not modified.

    .some(answer => answer !== undefined): This is calling the some method on the new array returned by the slice method. The some method tests whether at least one element in the array passes the test implemented by the provided function. In this case, the test is answer => answer !== undefined, which is a function that returns true if the answer is not undefined.

    So, the entire expression userAnswers.slice(questionIndex).some(answer => answer !== undefined) will return true if at least one of the answers from the current question (specified by questionIndex) or any future question is not undefined. In other words, it checks if the user has answered the current or any future question. If such an answer exists, hasAnsweredCurrentOrFutureQuestion will be true; otherwise, it will be false.
  */

  const hasAnsweredCurrentOrFutureQuestion: boolean = userAnswers
    .slice(questionIndex)
    .some((answer) => answer !== undefined);

  if (!hasAnsweredCurrentOrFutureQuestion) {
    return null;
  }

  if (questionIndex < questions.length - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ actionType: "next_question" })}
      >
        Next
      </button>
    );
  }

  if (questionIndex === questions.length - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ actionType: "finish_quiz" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
