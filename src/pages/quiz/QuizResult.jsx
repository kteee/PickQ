import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData, total, score } = location.state;

  return (
    <QuizContainer>
      <QuizResultContents>
        <CompletionText>모든 퀴즈를 완료하셨습니다!</CompletionText>
        <ResultTitle>퀴즈결과를 확인해보세요.</ResultTitle>
        <StatCard>
          <StatGrid>
            <StatItem>
              <StatLabel>점수</StatLabel>
              <StatValue>
                {score}
                <StatUnit> / {total}</StatUnit>
              </StatValue>
            </StatItem>
            <Divider aria-hidden="true" />
            <StatItem>
              <StatLabel>정답률</StatLabel>
              <StatValue>
                {Math.round((score / total) * 100)}
                <StatUnit>%</StatUnit>
              </StatValue>
            </StatItem>
          </StatGrid>
        </StatCard>

        <BaseButton
          backgroundColor="#b12af0"
          onClick={() => {
            navigate(`/quiz/${quizData.id}`);
          }}
        >
          다시하기
        </BaseButton>
        <BaseButton
          backgroundColor="rgb(92, 195, 255)"
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </BaseButton>
      </QuizResultContents>
    </QuizContainer>
  );
};

export default QuizResult;

const QuizContainer = styled.div`
  max-width: 1100px;
  margin: 0px auto 50px auto;
`;

const QuizResultContents = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 70%;

  @media (max-width: 640px) {
    width: 90%;
  }
`;

const CompletionText = styled.div`
  font-size: 21px;
  font-weight: 500;
  color: #2c2c2c;
  margin: 14px 2px 10px 2px;

  @media (max-width: 640px) {
    margin: 6px 2px 10px 2px;
    font-size: 19px;
  }
`;

const ResultTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #7a7a7a;
  margin: 0 2px;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const StatCard = styled.div`
  border: 1.2px solid rgb(182, 187, 192);
  border-radius: 6px;
  padding: 87px 24px 92px 24px;
  margin-top: 28px;
  margin-bottom: 20px;
  user-select: none;

  @media (max-width: 640px) {
    padding: 55px 16px 62px 16px;
  }
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;

  @media (max-width: 640px) {
    gap: 10px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background: rgb(182, 187, 192);
`;

const StatItem = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #636870;
  letter-spacing: 0.2px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const StatValue = styled.div`
  font-size: 42px;
  font-weight: 800;
  color: #292929;
  line-height: 1;

  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

const StatUnit = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #636870;
  margin-left: 6px;

  @media (max-width: 640px) {
    font-size: 17px;
  }
`;

const BaseButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 19px;
  font-weight: 600;
  width: 100%;
  margin-top: 13px;
  padding: 14px 0;
  background-color: ${(props) => props.backgroundColor || "#b0e9ff"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
