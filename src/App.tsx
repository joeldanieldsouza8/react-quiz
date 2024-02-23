import { useEffect } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import useQuestions from "./hooks/useQuestions";
import QuestionItem from "./components/QuestionItem";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import PreviousButton from "./components/PreviousButton";

function App() {
  const { questionsState, dispatch } = useQuestions();
  const { status } = questionsState;

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();

        dispatch({ actionType: "data_recieved", newDataPayload: data });

        console.log(data); // debug
      } catch (error) {
        dispatch({ actionType: "data_error" });
        // console.error(error); // debug
      }
    }

    getQuestions();
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <QuestionItem />
            <PreviousButton />
            <NextButton />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
