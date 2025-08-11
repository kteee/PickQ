import React from "react";
import styled from "styled-components";
import quizData from "../../data/quizData";
import { useParams } from "react-router-dom";

const QuizStart = () => {
  const { id } = useParams();
  const quiz = quizData.find((quiz) => quiz.id === Number(id));

  return (
    <QuizStartContainer>
      <QuizStartContents>
        <div>
          <h3>
            [{quiz.category}] {quiz.subject} - {quiz.count}문제
          </h3>
          <QuizTitle>{quiz.title}</QuizTitle>
        </div>
        <QuizImage src={quiz.image} />
        <StartButton>시작하기</StartButton>
      </QuizStartContents>
    </QuizStartContainer>
  );
};

export default QuizStart;

const QuizStartContainer = styled.div`
  max-width: 1100px;
  margin: 0px auto 50px auto;
`;

const QuizStartContents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin: 20px auto;
  width: 70%;

  // 모바일
  @media (max-width: 640px) {
    width: 90%;
  }
`;

const QuizTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #6e6e6e;
`;

const QuizImage = styled.img`
  width: 100%;
`;

const StartButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 22px;
  font-weight: 600;
  background-color: #5cc3ff;
  color: white;
  height: 60px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;
