export interface QuestionProps {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
  difficulty: "all" | "easy" | "medium" | "hard";
}

// 'allQuestions' is the single source of truth for the questions
// 'questions' is the list of questions to display and is initially set to 'allQuestions'

export interface QuestionsState {
  allQuestions: QuestionProps[]; // Store the original list of questions from the API
  questions: QuestionProps[]; // Store the questions to display
  status: "loading" | "error" | "ready" | "active" | "finished";
  questionIndex: number; // Keep track of the current question index
  userAnswer: number | null; // Store the user's answer
  userPoints: number; // Store the user's points
  highscore: number; // Store the highscore
  secondsRemaining: number | null; // Store the seconds remaining
  userAnswers: number[]; // Store the user's answers to all questions
}

export type QuestionsAction =
  | {
      actionType: "data/recieved";
      newDataPayload: QuestionProps[];
    }
  | {
      actionType: "data/error";
    }
  | {
      actionType: "quiz/start";
    }
  | {
      actionType: "user/answer";
      userAnswerPayload: number;
    }
  | {
      actionType: "question/next";
    }
  | {
      actionType: "question/previous";
    }
  | {
      actionType: "quiz/finish";
    }
  | {
      actionType: "quiz/restart";
    }
  | {
      actionType: "timer";
    }
  | {
      actionType: "option";
      difficultyPayload: "all" | "easy" | "medium" | "hard";
    }
  | {
      actionType: "questions/amount";
      numQuestionsPayload: number;
    };

const SECS_PER_QUESTION = 30;

function questionsReducer(
  questionsState: QuestionsState,
  action: QuestionsAction
): QuestionsState {
  // console.log("state", questionsState); // debug
  // console.log("action", action); // debug

  switch (action.actionType) {
    case "data/recieved": {
      return {
        ...questionsState,
        allQuestions: action.newDataPayload, // Store the original list
        questions: action.newDataPayload, // Initially display all questions
        status: "ready",
      };
    }

    case "data/error": {
      return { ...questionsState, status: "error" };
    }

    case "quiz/start": {
      // console.log("Start quiz");
      return {
        ...questionsState,
        status: "active",
        secondsRemaining: questionsState.questions.length * SECS_PER_QUESTION,
      };
    }

    // case "user/answer": {
    //   const currentQuestion: Question =
    //     questionsState.questions[questionsState.questionIndex];

    //   return {
    //     ...questionsState,
    //     userAnswer: action.userAnswerPayload, // Store the user's answer
    //     // Add points if the answer is correct
    //     userPoints:
    //       action.userAnswerPayload === currentQuestion.correctOption
    //         ? questionsState.userPoints + currentQuestion.points
    //         : questionsState.userPoints,
    //   };
    // }

    case "user/answer": {
      // Gets the current question from the questions array by using the questionIndex from the state object
      const currentQuestion: QuestionProps =
        questionsState.questions[questionsState.questionIndex];

      // Creates a new array to store the user's answers to all questions so far answered in the quiz currently by spreading the userAnswers array and adding the userAnswerPayload to the end of the array
      const newUserAnswers: number[] = [
        ...questionsState.userAnswers,
        action.userAnswerPayload,
      ];

      // Checks if the user's answer matchest the correct option of the current question, and adds points if it does match or keeps the user's points the same if it doesn't match the correct option
      const checkUserPoints =
        action.userAnswerPayload === currentQuestion.correctOption
          ? questionsState.userPoints + currentQuestion.points
          : questionsState.userPoints;

      return {
        ...questionsState,
        userAnswer: action.userAnswerPayload,
        userAnswers: newUserAnswers,
        userPoints: checkUserPoints,
      };
    }

    case "question/next": {
      return {
        ...questionsState,
        questionIndex: questionsState.questionIndex + 1, // Move to the next question
        userAnswer: null, // Reset the user's answer
      };
    }

    case "question/previous": {
      // Stores the index position of the previous question in the questions array by subtracting 1 from the questionIndex
      const previousQuestionIndex = questionsState.questionIndex - 1;

      return {
        ...questionsState,
        questionIndex: previousQuestionIndex, // Move to the previous question
        userAnswer: questionsState.userAnswers[previousQuestionIndex], // Update the user's answer to the previous question from the userAnswers array in the state object by using the previousQuestionIndex to get the user's answer from the array
      };
    }

    case "quiz/finish": {
      // console.log("Finish quiz");
      return {
        ...questionsState,
        status: "finished",
        highscore:
          questionsState.userPoints > questionsState.highscore
            ? questionsState.userPoints
            : questionsState.highscore, // Store the highscore
      };
    }

    case "quiz/restart": {
      // console.log("Restart quiz");
      return {
        ...questionsState,
        status: "active",
        questionIndex: 0, // Reset the question index
        userAnswer: null, // Reset the user's answer
        userPoints: 0, // Reset the user's points
        secondsRemaining: questionsState.questions.length * SECS_PER_QUESTION, // Reset the timer
      };
    }

    case "timer": {
      // console.log("Timer tick");
      return {
        ...questionsState,
        secondsRemaining:
          questionsState.secondsRemaining !== null
            ? questionsState.secondsRemaining - 1
            : null, // Decrease the seconds remaining if it is not null
        status:
          questionsState.secondsRemaining === 0
            ? "finished"
            : questionsState.status, // Finish the quiz if the time is up (0 seconds) otherwise keep the current status
      };
    }

    case "option": {
      if (action.difficultyPayload === "all") {
        return {
          ...questionsState,
          questions: [...questionsState.allQuestions], // Return all questions
          status: "ready",
          questionIndex: 0, // Reset to the first question of the original list
        };
      } else {
        // Filter questions by the selected difficulty
        const filteredQuestions = questionsState.allQuestions.filter(
          (question) => question.difficulty === action.difficultyPayload
        );

        // console.log("filtered questions", filteredQuestions); // debug
        // console.log("allQuestions", questionsState.allQuestions); // debug
        // console.log("questions", questionsState.questions); // debug

        return {
          ...questionsState,
          questions: filteredQuestions, // Store the filtered questions
          questionIndex: 0, // Reset to the first question of the filtered list
        };
      }
    }

    case "questions/amount": {
      const numQuestions = action.numQuestionsPayload; // Assume this payload carries the desired number of questions

      // Slice the 'questions' array to only include the number of questions user wants
      const updatedQuestions = questionsState.questions.slice(0, numQuestions);

      return {
        ...questionsState,
        questions: updatedQuestions, // Store the updated questions
      };
    }

    default:
      return questionsState;
  }
}

export { questionsReducer };