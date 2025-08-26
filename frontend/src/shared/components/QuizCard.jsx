import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ id, image, title, description, category, subject }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (category === "퀴즈") {
      navigate(`/quiz/${id}`);
    } else if (category === "심리테스트") {
      navigate(`/psytest/${id}`);
    }
  };

  return (
    <CardWrapper onClick={handleCardClick}>
      <div>
        <Image src={image} alt={`${title} 이미지`} />
      </div>
      <CardContent>
        <Category>
          <CategoryItem>#{category}</CategoryItem>
          <CategoryItem>#{subject}</CategoryItem>
        </Category>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContent>
    </CardWrapper>
  );
};

export default QuizCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid rgb(213, 215, 219);
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px -3px;
  }

  @media (max-width: 640px) {
    border: none;
    background-color: #ffffff;
    padding: 24px 16px 5px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      box-shadow: none;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16 / 10;
  border-radius: 10px 10px 0px 0px;

  @media (max-width: 640px) {
    border-radius: 4px;
    aspect-ratio: 16 / 9;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 2px 12px;

  @media (max-width: 640px) {
    padding: 10px 2px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: rgb(10, 10, 10);
  margin: 4px 2px 2px 4px;

  @media (max-width: 640px) {
    font-size: 18.5px;
    margin: 4px 2px 2px 3px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: rgb(113, 113, 130);
  margin: 1px 2px 19px 4px;

  @media (max-width: 640px) {
    font-size: 16px;
    margin: 2px 2px 8px 3px;
  }
`;

const Category = styled.div`
  display: flex;
  gap: 4px;
  font-size: 14px;
  color: rgb(100, 100, 100);
  margin: 6px 0px 0px 0px;

  @media (max-width: 640px) {
    margin: 0px 0px 2px 0px;
  }
`;

const CategoryItem = styled.div`
  font-size: 12.5px;
  background-color: rgb(243, 243, 243);
  color: rgb(52, 52, 52);
  border-radius: 20px;
  padding: 2px 8px;

  @media (max-width: 640px) {
    font-size: 13.5px;
  }
`;
