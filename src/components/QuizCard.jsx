import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ id, image, title, category, subject, count }) => {
  const navigate = useNavigate();

  const handleQuizCardClick = () => {
    navigate(`/quiz/${id}/start`);
  };

  return (
    <QuizCardWrapper onClick={handleQuizCardClick}>
      <QuizImage src={image} alt={`${title} 이미지`} />
      <QuizTitle>
        [{category}] {subject}-{count}문제
      </QuizTitle>
      <QuizDescription></QuizDescription>
      <QuizDescription>{title}</QuizDescription>
    </QuizCardWrapper>
  );
};

export default QuizCard;

const QuizCardWrapper = styled.div`
  height: fit-content;
  display: grid;
  margin-bottom: 24px;
  cursor: pointer;
`;

const QuizImage = styled.img`
  width: 100%;
  height: 208px;
  object-fit: contain;
  border-radius: 6px;

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.104);
  }
`;

const QuizTitle = styled.h3`
  margin: 18px 2px 5px 2px;
`;

const QuizDescription = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #747474;
  margin: 2px;
`;
