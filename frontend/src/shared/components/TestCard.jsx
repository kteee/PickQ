import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TestCard = ({ shortId, image, title, description, category }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (category === "quiz") {
      navigate(`/quiz/${shortId}`);
    } else if (category === "psytest") {
      navigate(`/psytest/${shortId}`);
    }
  };

  return (
    <CardWrapper onClick={handleCardClick}>
      <div>
        <Image src={image} alt={`${title} 이미지`} />
      </div>
      <CardContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContent>
    </CardWrapper>
  );
};

export default TestCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  cursor: pointer;

  @media (max-width: 640px) {
    border: none;
    background-color: #ffffff;
    padding: 24px 16px 5px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px -3px;
  }

  @media (max-width: 640px) {
    border-radius: 4px;
    aspect-ratio: 16 / 9;
    height: auto;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 2px;

  @media (max-width: 640px) {
    padding: 10px 2px;
  }
`;

const Title = styled.h3`
  font-size: 17px;
  font-weight: 500;
  color: rgb(10, 10, 10);
  margin: 10px 2px 2px 4px;

  @media (max-width: 640px) {
    font-size: 18.5px;
    margin: 4px 2px 2px 3px;
  }
`;

const Description = styled.p`
  font-size: 15px;
  color: rgb(113, 113, 130);
  margin: 2px 2px 22px 4px;

  @media (max-width: 640px) {
    font-size: 16px;
    margin: 2px 2px 8px 3px;
  }
`;
