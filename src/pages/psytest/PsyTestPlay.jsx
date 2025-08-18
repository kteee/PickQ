import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LinearProgress, Box } from "@mui/material";
import test01, { psytestResults01 } from "../../data/psytestSets/test01.js";
import test02, { psytestResults02 } from "../../data/psytestSets/test02.js";

const PsyTestPlay = ({ testData }) => {
  const navigate = useNavigate();

  const id = Number(testData.id);
  const testMap = {
    7: { test: test01, psytestResult: psytestResults01 },
    8: { test: test02, psytestResult: psytestResults02 },
  };
  const { test, psytestResult } = testMap[id] ?? [];

  const total = test.length || 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (!test || test.length === 0) return <div>테스트가 존재하지 않습니다.</div>;

  const progress = Math.round(((currentIndex + 1) / total) * 100);

  const handleOptionClick = (i) => {
    const point = i === 0 ? 1 : 0;
    const nextScore = score + point;

    if (currentIndex < total - 1) {
      setScore(nextScore);
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate(`/test/${id}/result`, {
        state: { testData, total, score: nextScore, psytestResult },
      });
    }
  };

  return (
    <PlayContents>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Box sx={{ width: "100%", mr: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#b12af0",
              },
              backgroundColor: "#e9f2f8",
              height: 8,
            }}
          />
        </Box>
        <QuestionCounter>
          {currentIndex + 1} / {total}
        </QuestionCounter>
      </Box>
      <QuestionText>
        {currentIndex + 1}. {test[currentIndex].question}
      </QuestionText>
      {test[currentIndex].options.map((option, i) => {
        return (
          <OptionButton key={i} onClick={() => handleOptionClick(i)}>
            <div>{option}</div>
          </OptionButton>
        );
      })}
    </PlayContents>
  );
};

export default PsyTestPlay;

const PlayContents = styled.div`
  font-size: 19px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 15px;
  margin: 25px auto;
  width: 70%;

  @media (max-width: 640px) {
    width: 90%;
  }
`;

const QuestionCounter = styled.div`
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1;
  color: rgb(87, 91, 95);

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: rgb(27, 28, 29);
  margin: 20px 0;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 17px;
  }
`;

const OptionButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 17px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  border: none;
  border-radius: 10px;
  padding: 16px 18px;
  background-color: rgb(240, 244, 249);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: rgb(221, 227, 234);
  }

  @media (max-width: 640px) {
    font-size: 16px;
    padding: 15px 18px;
  }
`;
