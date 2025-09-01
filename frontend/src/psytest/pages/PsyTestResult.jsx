import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import TestResultFooter from "../../shared/components/TestResultFooter";

const PsyTestResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState();
  const [resultType, setResultType] = useState(null);
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

  // 심리테스트 결과 타입과 결과 데이터의 score를 비교하여 resultType 구하기
  useEffect(() => {
    if (result) {
      const type = result?.testId?.psytestResults?.find(
        (r) => r.minScore <= result.score && r.maxScore >= result.score
      );
      setResultType(type);
    }
  }, [result]);

  if (isLoading || !result || !resultType) {
    return null;
  }

  return (
    <QuizContainer>
      <QuizResultContents>
        <TitleText>{result.testId.title} 결과</TitleText>
        <Description>{resultType.description}</Description>
        <ResultWrapper>
          <ResultImg src={resultType.img} />
        </ResultWrapper>
        <TestResultFooter
          id={result.testId.shortId}
          title={result.testId.title}
        />
      </QuizResultContents>
    </QuizContainer>
  );
};

export default PsyTestResult;

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

const Description = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #7a7a7a;
  margin: 4px 2px 13px 2px;

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ResultImg = styled.img`
  margin: 15px auto 25px auto;
  width: 90%;
`;
