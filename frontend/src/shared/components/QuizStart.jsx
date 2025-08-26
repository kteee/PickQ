import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizPlay from "../../quiz/pages/QuizPlay";
import PsyTestPlay from "../../quiz/pages/PsyTestPlay";
import { useHttpClient } from "../hooks/http-hook";

const QuizStart = () => {
  const { id } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedQuiz, setLoadedQuiz] = useState();
  const [playMode, setPlayMode] = useState("start");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/quiz/${id}`
        );
        setLoadedQuiz(responseData.data);
      } catch (err) {}
    };

    fetchQuiz();
  }, [id, sendRequest]);

  const errorHandler = () => {
    clearError();
  };

  // if (!isLoading && !loadedQuiz) {
  //   return <div>존재하지 않는 테스트입니다.</div>;
  // }

  if (isLoading || !loadedQuiz) {
    return null;
  }

  if (playMode === "play") {
    if (loadedQuiz.category === "퀴즈")
      return <QuizPlay quizData={loadedQuiz} />;
    if (loadedQuiz.category === "심리테스트")
      return <PsyTestPlay quizData={loadedQuiz} />;
    return <div>알 수 없는 테스트 유형입니다.</div>;
  }

  return (
    <Container>
      <QuizStartContents>
        <QuizImage src={loadedQuiz.image} alt={loadedQuiz.title} />
        <QuizCategory>
          <CategoryItem>#{loadedQuiz.category}</CategoryItem>
          <CategoryItem>#{loadedQuiz.subject}</CategoryItem>
        </QuizCategory>
        <QuizTitle>{loadedQuiz.title}</QuizTitle>
        <QuizDescription>{loadedQuiz.description}</QuizDescription>
        <StartButton onClick={() => setPlayMode("play")}>시작하기</StartButton>
      </QuizStartContents>
    </Container>
  );
};

export default QuizStart;

const Container = styled.div`
  max-width: 1020px;
  margin: 0px auto 50px auto;
`;

const QuizStartContents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 70%;

  @media (max-width: 640px) {
    width: 90%;
  }
`;

const QuizImage = styled.img`
  width: 100%;
  margin: 10px auto;
  border-radius: 4px;
  object-fit: contain;
`;

const QuizCategory = styled.div`
  display: flex;
  gap: 6px;
  color: rgb(3, 2, 19);
  margin: 8px 0 8px 0;
`;

const CategoryItem = styled.div`
  font-size: 12.5px;
  border: 1px solid #eceef2;
  background-color: #eceef2;
  border-radius: 12px;
  padding: 2px 7px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const QuizTitle = styled.h2`
  font-size: 19px;
  font-weight: 500;
  margin: 8px 2px 12px 2px;

  @media (max-width: 640px) {
    font-size: 19px;
  }
`;

const QuizDescription = styled.p`
  font-size: 16px;
  color: rgb(113, 113, 130);
  margin: 0px 2px;
`;

const StartButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 19px;
  font-weight: 600;
  background-color: #5cc3ff;
  color: white;
  padding: 13px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 35px;

  @media (max-width: 640px) {
    font-size: 17px;
  }
`;
