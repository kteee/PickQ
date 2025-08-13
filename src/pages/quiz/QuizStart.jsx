import styled from "styled-components";

const QuizStart = ({ quizData, onStart }) => {
  return (
    <QuizStartContents>
      <QuizCategory>
        [{quizData.category}] {quizData.type}/{quizData.count}문제
      </QuizCategory>
      <QuizTitle>{quizData.title}</QuizTitle>

      <QuizImage src={quizData.image} alt={quizData.title} />
      <StartButton onClick={onStart}>시작하기</StartButton>
    </QuizStartContents>
  );
};

export default QuizStart;

const QuizStartContents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 70%;

  // 모바일
  @media (max-width: 640px) {
    width: 90%;
  }
`;

const QuizCategory = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #535353;
  margin: 5px 2px 10px 2px;

  // 모바일
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const QuizTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 3px 2px;

  // 모바일
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const QuizImage = styled.img`
  width: 100%;
  margin: 27px 0;
`;

const StartButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 19px;
  font-weight: 600;
  background-color: #5cc3ff;
  color: white;
  padding: 14px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;

  @media (max-width: 640px) {
    font-size: 17px;
  }
`;
