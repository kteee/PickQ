import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import quizList from "../../data/quizList";
import QuizStart from "./QuizStart";
import QuizPlay from "./QuizPlay";

const Quiz = () => {
  const { id } = useParams();
  const quizData = quizList.find((quiz) => quiz.id === Number(id));
  const [playMode, setPlayMode] = useState("start");
  return (
    <QuizContainer>
      {playMode === "start" ? (
        <QuizStart
          quizData={quizData}
          onStart={() => {
            setPlayMode("play");
          }}
        />
      ) : (
        <QuizPlay quizData={quizData} />
      )}
    </QuizContainer>
  );
};

export default Quiz;

const QuizContainer = styled.div`
  max-width: 1100px;
  margin: 0px auto 50px auto;
`;
