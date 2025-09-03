import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TestResultFooter from "../../shared/components/TestResultFooter";

const QuizResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tests/result/${id}`
        );
        setResult(responseData.data);
      } catch (err) {}
    };

    fetchResult();
  }, [id, sendRequest]);

  if (isLoading || !result) {
    return null;
  }

  const rate = Math.round((result.score / result.total) * 100);

  let message = "";
  if (rate >= 80) {
    message = "훌륭해요 ✨ 멋진 결과예요!";
  } else if (rate >= 50) {
    message = "괜찮아요 🙂 평균 이상이에요";
  } else {
    message = "아쉬워요 😅 다음에 더 잘할 수 있어요.";
  }

  return (
    <QuizContainer>
      <QuizResultContents>
        <TitleText>{result.testId.title} 결과</TitleText>
        <CompletionText>{message}</CompletionText>
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
                {rate}
                <StatUnit>%</StatUnit>
              </StatValue>
            </StatItem>
          </StatCard>
        </CardWrapper>
        <TestResultFooter
          id={result.testId.shortId}
          title={result.testId.title}
          image={result.testId.image}
        />
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
  align-items: center;
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
  margin: 14px 2px 12px 2px;

  @media (max-width: 640px) {
    margin: 6px 2px 10px 2px;
    font-size: 18px;
  }
`;

const CompletionText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #7a7a7a;
  margin: 4px 2px 13px 2px;

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 18px;
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
