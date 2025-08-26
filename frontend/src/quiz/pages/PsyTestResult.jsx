import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import { psytestResults01 } from "../data/psytestSets/test01.js";
import { psytestResults02 } from "../data/psytestSets/test02.js";
import ResultFooter from "../../shared/components/TestResultFooter.jsx";

const PsyTestResult = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const score = searchParams.get("score");

  const psytestMap = {
    7: psytestResults01,
    8: psytestResults02,
  };

  const psytestResult = psytestMap[Number(id)] ?? [];

  const result = psytestResult.find(
    (result) => score >= result.minScore && score <= result.maxScore
  );

  return (
    <QuizContainer>
      <QuizResultContents>
        <TitleText>{title}</TitleText>
        <CompletionText>나의 결과를 확인해보세요.</CompletionText>
        <ResultWrapper>
          <ResultImg src={result.img} />
        </ResultWrapper>
        <ResultFooter id={id} title={title} />
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

const ResultWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ResultImg = styled.img`
  margin: 15px 0 20px 0;
  width: 100%;
`;
