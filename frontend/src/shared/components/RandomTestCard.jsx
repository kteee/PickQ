import styled from "styled-components";

const RandomTestCard = ({ image, title }) => {
  return (
    <Card $image={image}>
      <CardText>{title}</CardText>
    </Card>
  );
};

export default RandomTestCard;

const Card = styled.div`
  height: 170px;
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

  @media (max-width: 640px) {
    height: 150px;
    width: 52%;
    flex-shrink: 0;
    scroll-snap-align: start;
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
