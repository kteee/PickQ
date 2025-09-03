import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SmallTestCard = ({ id, category, image, title }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (category === "quiz") {
      navigate(`/quiz/${id}`);
    } else if (category === "psytest") {
      navigate(`/psytest/${id}`);
    }
  };

  return (
    <CardWrapper>
      <Card $image={image} onClick={handleCardClick}>
        <CardText>{title}</CardText>
      </Card>
    </CardWrapper>
  );
};

export default SmallTestCard;

const CardWrapper = styled.div`
  width: 100%;
  height: 85%;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px -3px;
  }

  @media (max-width: 640px) {
    height: 295px;
    border-radius: 0px;
  }
`;

const CardText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 17px;
  width: 100%;
  background: rgba(0, 0, 0, 0.363);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 0px 0px 20px 20px;

  @media (max-width: 640px) {
    border-radius: 0px;
  }
`;
