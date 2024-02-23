import React, { createContext, useEffect, useReducer } from "react";
import {
  questionsReducer,
  QuestionsState,
  QuestionsAction,
} from "../reducers/questionsReducer";

// Function to load the highscore from local storage
function loadHighscore(): number {
  const savedHighscore: string | null = localStorage.getItem("highscore");

  return savedHighscore ? JSON.parse(savedHighscore) : 0;
}

const initialState: QuestionsState = {
  allQuestions: [], // Store the original list of questions from the API
  questions: [], // Store the questions to display
  status: "loading",
  questionIndex: 0, // Keep track of the current question index
  userAnswer: null, // Store the answer selected by the user for the current question
  userPoints: 0, // Store the user's points
  highscore: loadHighscore(), // Initialize highscore from local storage
  secondsRemaining: null, // Store the seconds remaining
  userAnswers: [], // Store all the user's answers 
};

// Create a context
const QuestionsContext = createContext<{
  questionsState: QuestionsState;
  dispatch: React.Dispatch<QuestionsAction>;
}>({
  questionsState: initialState,
  dispatch: () => null, // default function
});

// Create a provider
function QuestionsProvider({ children }: { children: React.ReactNode }) {
  const [questionsState, dispatch] = useReducer(questionsReducer, initialState);

  useEffect(() => {
    // Save the highscore to local storage
    localStorage.setItem("highscore", JSON.stringify(questionsState.highscore));
  }, [questionsState.highscore]);

  const contextValue = { questionsState, dispatch };

  return (
    <QuestionsContext.Provider value={contextValue}>
      {children}
    </QuestionsContext.Provider>
  );
}

export { QuestionsProvider, QuestionsContext };
