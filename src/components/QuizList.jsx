import React from "react";
import styled from "styled-components";
import QuizCard from "./QuizCard";
import quizData from "../data/quizData";

const QuizList = () => {
  return (
    <QuizListWrapper>
      {quizData.map((quiz) => (
        <QuizCard key={quiz.id} {...quiz} />
      ))}
    </QuizListWrapper>
  );
};

export default QuizList;

const QuizListWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;

  // 태블릿
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  // 모바일
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
