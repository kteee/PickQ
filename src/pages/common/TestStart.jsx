import styled from "styled-components";

const TestStart = ({ testData, onStart }) => {
  return (
    <QuizStartContents>
      <QuizImage src={testData.image} alt={testData.title} />
      <QuizCategory>
        <CategoryItem>#{testData.category}</CategoryItem>
        <CategoryItem>#{testData.subject}</CategoryItem>
      </QuizCategory>
      <QuizTitle>{testData.title}</QuizTitle>
      <QuizDescription>{testData.description}</QuizDescription>
      <StartButton onClick={onStart}>시작하기</StartButton>
    </QuizStartContents>
  );
};

export default TestStart;

const QuizStartContents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 70%;

  @media (max-width: 640px) {
    width: 90%;
  }
`;

const QuizImage = styled.img`
  width: 100%;
  margin: 10px auto;
  border-radius: 4px;
  object-fit: contain;
`;

const QuizCategory = styled.div`
  display: flex;
  gap: 6px;
  color: rgb(3, 2, 19);
  margin: 8px 0 8px 0;
`;

const CategoryItem = styled.div`
  font-size: 12.5px;
  border: 1px solid #eceef2;
  background-color: #eceef2;
  border-radius: 12px;
  padding: 2px 7px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const QuizTitle = styled.h2`
  font-size: 19px;
  font-weight: 500;
  margin: 8px 2px 12px 2px;

  @media (max-width: 640px) {
    font-size: 19px;
  }
`;

const QuizDescription = styled.p`
  font-size: 16px;
  color: rgb(113, 113, 130);
  margin: 0px 2px;
`;

const StartButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 19px;
  font-weight: 600;
  background-color: #5cc3ff;
  color: white;
  padding: 13px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 35px;

  @media (max-width: 640px) {
    font-size: 17px;
  }
`;
