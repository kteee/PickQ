import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TestCard = ({ id, image, title, description, category, subject }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/test/${id}`);
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

export default TestCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid rgb(213, 215, 219);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px -3px;
  }

  @media (max-width: 640px) {
    border: none;
    background-color: #ffffff;
    padding: 26px 16px 10px 16px;
    box-sizing: border-box;
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

  @media (max-width: 640px) {
    border-radius: 4px;
    aspect-ratio: 16 / 9;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding: 10px 14px;

  @media (max-width: 640px) {
    padding: 10px 2px;
  }
`;

const Category = styled.div`
  display: flex;
  gap: 6px;
  font-size: 14px;
  color: rgb(3, 2, 19);
`;

const CategoryItem = styled.div`
  font-size: 12px;
  border: 1px solid #eceef2;
  background-color: #eceef2;
  border-radius: 12px;
  padding: 2px 7px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: rgb(10, 10, 10);
  margin: 7px 2px 2px 3px;

  @media (max-width: 640px) {
    font-size: 19px;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: rgb(113, 113, 130);
  margin: 2px 2px 18px 3px;

  @media (max-width: 640px) {
    font-size: 17px;
    margin: 2px 2px 18px 2px;
  }
`;
