import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const PsyTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { testData, score, psytestResult } = location.state;

  const result = psytestResult.find(
    (result) => score >= result.minScore && score <= result.maxScore
  );

  return (
    <QuizContainer>
      <QuizResultContents>
        <TitleText>{testData.title}</TitleText>
        <CompletionText>
          테스트를 완료하였습니다! 결과를 확인해보세요.
        </CompletionText>
        <ResultWrapper>
          <ResultImg src={result.img} />
        </ResultWrapper>

        <BaseButton
          $backgroundColor="#b12af0"
          onClick={() => {
            navigate(`/test/${testData.id}`);
          }}
        >
          다시하기
        </BaseButton>
        <BaseButton
          $backgroundColor="rgb(92, 195, 255)"
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

export default PsyTestResult;

const QuizContainer = styled.div`
  max-width: 980px;
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
    font-size: 19px;
  }
`;

const CompletionText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #7a7a7a;
  margin: 0px 2px 8px 2px;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ResultImg = styled.img`
  margin: 20px 0 25px 0;
  width: 100%;
`;

const BaseButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 19px;
  font-weight: 600;
  width: 100%;
  margin-top: 13px;
  padding: 14px 0;
  background-color: ${(props) => props.$backgroundColor || "#b0e9ff"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
