import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ id, image, title, category, subject, count, type }) => {
  const navigate = useNavigate();

  const handleQuizCardClick = () => {
    navigate(`/quiz/${id}`);
  };

  return (
    <QuizCardWrapper onClick={handleQuizCardClick}>
      <QuizImage src={image} alt={`${title} 이미지`} />
      <QuizCategory>
        [{category}] {type}/{count}문제
      </QuizCategory>
      <QuizTitle>{title}</QuizTitle>
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

const QuizCategory = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #747474;
  margin: 12px 2px 5px 2px;
`;

const QuizTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 5px 2px 5px 2px;
`;
