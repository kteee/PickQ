import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SmallTestCard = ({ id, category, image, title, isSearchMode }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (category === "quiz") {
      navigate(`/quiz/${id}`);
    } else if (category === "psytest") {
      navigate(`/psytest/${id}`);
    }
  };

  return (
    <Card $image={image} $isSearchMode={isSearchMode} onClick={handleCardClick}>
      <CardText>{title}</CardText>
    </Card>
  );
};

export default SmallTestCard;

const Card = styled.div`
  height: ${({ $isSearchMode }) => ($isSearchMode ? "240px" : "180px")};
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px -3px;
  }

  @media (max-width: 1000px) {
    height: ${({ $isSearchMode }) => ($isSearchMode ? "100%" : "160px")};
    width: ${({ $isSearchMode }) => ($isSearchMode ? "auto" : "35%")};
    aspect-ratio: ${({ $isSearchMode }) => ($isSearchMode ? "4 / 3" : "unset")};
    flex-shrink: 0;
    scroll-snap-align: start;
  }

  @media (max-width: 650px) {
    width: ${({ $isSearchMode }) => ($isSearchMode ? "100%" : "45%")};
    aspect-ratio: ${({ $isSearchMode }) =>
      $isSearchMode ? "16 / 9" : "unset"};
  }
`;

const CardText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  background: rgba(0, 0, 0, 0.432);
  color: #ffffff;
  padding: 6px 10px;
  border-radius: 0px 0px 8px 8px;
`;
