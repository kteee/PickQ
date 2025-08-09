import React from "react";
import styled from "styled-components";
import QuizCard from "./QuizCard";
import Quiz01 from "../assets/quiz01.png";

const quizData = [
  {
    id: 1,
    title: "상식퀴즈(1)",
    description: "[상식퀴즈] 20문제 중 몇 개 맞추실 수 있나요?",
    image: Quiz01,
    category: "상식퀴즈",
  },
  {
    id: 2,
    title: "상식퀴즈(2)",
    description: "[상식퀴즈] 13문제 이상 맞히면 상식이 훌륭한 수준!",
    image: Quiz01,
    category: "상식퀴즈",
  },
  {
    id: 3,
    title: "상식퀴즈(3)",
    description: "[상식퀴즈] 절반은 꼭 맞춰야할 기본 상식!",
    image: Quiz01,
    category: "상식퀴즈",
  },
  {
    id: 4,
    title: "상식퀴즈(4)",
    description: "[상식퀴즈] 10문제 이상 맞히면 상식이 충분한 사람!",
    image: Quiz01,
    category: "상식퀴즈",
  },
  {
    id: 5,
    title: "초성퀴즈(1)",
    description: "[초성퀴즈] 당신의 실력을 테스트해보세요!",
    image: Quiz01,
    category: "초성퀴즈",
  },
];

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
`;
