import styled from "styled-components";

const PopularContentCard = ({ image, title }) => {
  return (
    <Card image={image}>
      <CardText>{title}</CardText>
    </Card>
  );
};

export default PopularContentCard;

const Card = styled.div`
  width: 100%;
  height: 175px;
  border-radius: 4px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
`;

const CardText = styled.div`
  width: 100%;

  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  padding: 5px 8px;
`;
