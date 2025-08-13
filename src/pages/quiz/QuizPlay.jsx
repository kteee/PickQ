import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LinearProgress, Box } from "@mui/material";
import { QUIZ_TYPE } from "../../data/quizList.js";
import quiz01 from "../../data/quizSets/quiz01.js";
import quiz02 from "../../data/quizSets/quiz02.js";
import quiz03 from "../../data/quizSets/quiz03.js";
import quiz04 from "../../data/quizSets/quiz04.js";
import quiz05 from "../../data/quizSets/quiz05.js";
import quiz06 from "../../data/quizSets/quiz06.js";

const QuizPlay = ({ quizData }) => {
  const navigate = useNavigate();

  const id = Number(quizData.id);
  const quizMap = {
    1: quiz01,
    2: quiz02,
    3: quiz03,
    4: quiz04,
    5: quiz05,
    6: quiz06,
  };
  const quiz = quizMap[id] ?? [];

  const total = quiz.length || 1;
  const [quizStep, setQuizStep] = useState("question"); // question, answer
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // 객관식 선택값
  const [subjectiveInput, setSubjectiveInput] = useState(""); // 주관식 입력값
  const [score, setScore] = useState(0);

  if (!quiz || quiz.length === 0) return <div>퀴즈가 존재하지 않습니다.</div>;

  const progress = Math.round(((currentQuestionIndex + 1) / total) * 100);

  const isSubjectiveCorrect =
    subjectiveInput === quiz[currentQuestionIndex].answer; // 주관식 정답

  const handleMultipleChoiceSubmit = (option) => {
    setSelectedOption(option);
    if (option === quiz[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
    }
    setQuizStep("answer");
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSubjectiveSubmit();
    }
  };

  const handleSubjectiveSubmit = () => {
    if (subjectiveInput === quiz[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
    }
    setQuizStep("answer");
  };

  const handleNextButtonClick = () => {
    if (currentQuestionIndex < total - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubjectiveInput("");
      setQuizStep("question");
    } else {
      navigate(`/quiz/${id}/result`, { state: { quizData, total, score } });
    }
  };

  return (
    <QuizPlayContents>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Box sx={{ width: "100%", mr: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#66c0fc",
              },
              backgroundColor: "#e9f2f8",
              height: 8,
            }}
          />
        </Box>
        <QuestionCounter>
          {currentQuestionIndex + 1} / {total}
        </QuestionCounter>
      </Box>
      <QuestionText>
        {currentQuestionIndex + 1}. {quiz[currentQuestionIndex].question}
      </QuestionText>
      {quizData.type === QUIZ_TYPE.MULTIPLE_CHOICE ? (
        quiz[currentQuestionIndex].options.map((option, i) => {
          const isSelected = option === selectedOption; // 내가 고른 답
          const isCorrectAnswer = option === quiz[currentQuestionIndex].answer; // 실제 정답

          return (
            <OptionButton
              key={i}
              onClick={() => handleMultipleChoiceSubmit(option)}
              isQuestionMode={quizStep === "question"}
              isCorrectAnswer={quizStep === "answer" && isCorrectAnswer}
              isWrong={quizStep === "answer" && isSelected && !isCorrectAnswer}
              disabled={quizStep !== "question"}
            >
              <div>
                {String.fromCharCode(65 + i)}. {option}
              </div>
              {quizStep === "answer" && (
                <>
                  {isCorrectAnswer && (
                    <AnswerResultText isCorrectAnswer={true}>
                      O 정답
                    </AnswerResultText>
                  )}
                  {isSelected && !isCorrectAnswer && (
                    <AnswerResultText isCorrectAnswer={false}>
                      X 오답
                    </AnswerResultText>
                  )}
                </>
              )}
            </OptionButton>
          );
        })
      ) : (
        <SubjectiveWrapper>
          <SubjectiveInput
            key={quizStep}
            type="search"
            value={subjectiveInput}
            onChange={(e) => setSubjectiveInput(e.target.value)}
            onKeyUp={handleEnterKey}
            disabled={quizStep !== "question"}
            autoFocus
          ></SubjectiveInput>

          {quizStep === "question" && (
            <SubmitButton onClick={handleSubjectiveSubmit}>확인</SubmitButton>
          )}
          {quizStep === "answer" && (
            <SubjectiveResultBox>
              <SubjectiveResultText $isCorrectAnswer={isSubjectiveCorrect}>
                {isSubjectiveCorrect ? "O 정답" : "X 오답"}
              </SubjectiveResultText>
              <CorrectAnswerText>
                {quiz[currentQuestionIndex].answer}
              </CorrectAnswerText>
            </SubjectiveResultBox>
          )}
        </SubjectiveWrapper>
      )}

      {quizStep === "answer" ? (
        <ButtonWrapper>
          <NextButton
            onClick={handleNextButtonClick}
            $done={currentQuestionIndex < total - 1}
          >
            {currentQuestionIndex < total - 1 ? "다음문제" : "결과보기"}
          </NextButton>
        </ButtonWrapper>
      ) : null}
    </QuizPlayContents>
  );
};

export default QuizPlay;

const QuizPlayContents = styled.div`
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  border: none;
  border-radius: 10px;
  padding: 16px 18px;
  background-color: ${({ isCorrectAnswer, isWrong }) =>
    isCorrectAnswer ? "#dbf7dc" : isWrong ? "#fde3e3e6" : "rgb(240, 244, 249)"};
  cursor: ${({ isQuestionMode }) => (isQuestionMode ? "pointer" : "default")};
  -webkit-tap-highlight-color: transparent;

  ${({ isQuestionMode }) =>
    isQuestionMode &&
    `
    &:hover {
      background-color: rgb(221, 227, 234);
    }
  `}

  &:disabled {
    color: inherit;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    padding: 15px 18px;
  }
`;

const AnswerResultText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.isCorrectAnswer ? "green" : "red")};

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-self: center;
  width: 70%;
`;

const NextButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  width: 100%;
  background-color: ${(props) => (props.$done ? "#5cc3ff" : "#b12af0")};
  border: transparent;
  border-radius: 4px;
  margin-top: 30px;
  padding: 14px 0;
  color: white;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const SubjectiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 5px;
  width: 100%;
`;

const SubjectiveInput = styled.input`
  font-family: "Noto Sans KR", sans-serif;

  padding: 14px 16px;
  font-size: 17px;
  border: 1.5px solid #cbd5e1;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #5cc3ff;
  }

  @media (max-width: 640px) {
    font-size: 17px;
  }
`;

const SubmitButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  padding: 14px;
  font-size: 17px;
  font-weight: 500;
  color: white;
  background-color: #5cc3ff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 640px) {
    font-size: 17px;
  }
`;

const SubjectiveResultBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin: 28px 0 8px 0;
`;

const SubjectiveResultText = styled.div`
  font-size: 19px;
  font-weight: 600;
  color: ${(props) => (props.$isCorrectAnswer ? "green" : "red")};
  margin-top: 2px;
  margin-bottom: 13px;
`;

const CorrectAnswerText = styled.div`
  font-size: 23px;
  color: #555;
`;
