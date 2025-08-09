import React from "react";
import styled from "styled-components";

const QuizCard = ({ image, title, description, category }) => {
  return (
    <QuizCardWrapper>
      <QuizImage src={image} alt={`${title} 이미지`} />
      <QuizTitle>{title}</QuizTitle>
      <QuizDescription>{description}</QuizDescription>
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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }
`;

const QuizTitle = styled.h3`
  margin: 18px 2px 13px 2px;
`;

const QuizDescription = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #747474;
  margin: 2px;
`;
