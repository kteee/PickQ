import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LinearProgress, Box } from "@mui/material";
import test01 from "../data/psytestSets/test01.js";
import test02 from "../data/psytestSets/test02.js";

const PsyTestPlay = ({ testData }) => {
  const navigate = useNavigate();

  const id = Number(testData.id);
  const testMap = {
    7: test01,
    8: test02,
  };
  const questions = testMap[id] ?? [];

  const total = questions.length || 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0)
    return <div>테스트가 존재하지 않습니다.</div>;

  const progress = Math.round(((currentIndex + 1) / total) * 100);

  const handleOptionClick = (i) => {
    const point = i === 0 ? 1 : 0;
    const nextScore = score + point;

    if (currentIndex < total - 1) {
      setScore(nextScore);
      setCurrentIndex((prev) => prev + 1);
    } else {
      const params = createSearchParams({
        title: testData.title,
        score: nextScore,
      });

      navigate({
        pathname: `/psytest/${id}/result`,
        search: `?${params}`,
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
        {currentIndex + 1}. {questions[currentIndex].question}
      </QuestionText>
      {questions[currentIndex].options.map((option, i) => {
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
  -webkit-tap-highlight-color: rgba(221, 227, 234, 0.322);

  &:hover {
    background-color: rgb(221, 227, 234);
  }

  @media (max-width: 640px) {
    font-size: 16px;
    padding: 15px 18px;

    &:hover {
      background-color: rgb(240, 244, 249);
    }
  }
`;
