import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ResultFooter from "../../shared/components/TestResultFooter";
import { useHttpClient } from "../../shared/hooks/http-hook";

const QuizResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    console.log(id);
    const fetchResult = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/quiz/result/${id}`
        );
        setResult(responseData.data);
      } catch (err) {}
    };

    fetchResult();
  }, [id, sendRequest]);

  if (isLoading || !result) {
    return null;
  }

  return (
    <QuizContainer>
      <QuizResultContents>
        <TitleText></TitleText>
        <CompletionText>나의 퀴즈 결과를 확인해보세요.</CompletionText>
        <CardWrapper>
          <StatCard>
            <StatItem>
              <StatLabel>점수</StatLabel>
              <StatValue>
                {result.score}
                <StatUnit> / {result.total}</StatUnit>
              </StatValue>
            </StatItem>
          </StatCard>
          <StatCard>
            <StatItem>
              <StatLabel>정답률</StatLabel>
              <StatValue>
                {Math.round((result.score / result.total) * 100)}
                <StatUnit>%</StatUnit>
              </StatValue>
            </StatItem>
          </StatCard>
        </CardWrapper>
        <ResultFooter id={id} />
      </QuizResultContents>
    </QuizContainer>
  );
};

export default QuizResult;

const QuizContainer = styled.div`
  max-width: 1020px;
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

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #2c2c2c;
  margin: 10px 2px 12px 2px;

  @media (max-width: 640px) {
    margin: 6px 2px 10px 2px;
    font-size: 18px;
  }
`;

const CompletionText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #7a7a7a;
  margin: 0px 2px 8px 2px;

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;
`;

const StatCard = styled.div`
  width: 100%;
  height: 230px;
  background-color: rgb(248, 248, 251);
  border: 1px solid rgb(213, 215, 219);
  border-radius: 6px;
  margin: 20px 0;
  user-select: none;

  @media (max-width: 640px) {
    height: 170px;
  }
`;

const StatItem = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #636870;
  letter-spacing: 0.2px;
  margin-bottom: 14px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const StatValue = styled.div`
  font-size: 42px;
  font-weight: 800;
  color: #292929;
  line-height: 1;
  margin-bottom: 13px;

  @media (max-width: 640px) {
    font-size: 35px;
  }
`;

const StatUnit = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #636870;
  margin-left: 6px;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
