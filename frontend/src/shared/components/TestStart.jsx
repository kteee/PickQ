import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { getCategoryLabel } from "../data/category";
import QuizPlay from "../../quiz/pages/QuizPlay";
import PsyTestPlay from "../../psytest/pages/PsyTestPlay";
import AlertSnackbar from "./AlertSnackbar";

const TestStart = () => {
  const { id } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedTest, setLoadedTest] = useState();
  const [playMode, setPlayMode] = useState("start");

  console.log(id);
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/tests/${id}`
        );
        setLoadedTest(responseData.data);
      } catch (err) {}
    };

    fetchTest();
  }, [id, sendRequest]);

  if (isLoading) {
    return null;
  }

  if (!isLoading && !loadedTest) {
    return <div>존재하지 않는 테스트입니다.</div>;
  }

  if (playMode === "play") {
    if (loadedTest.category === "quiz")
      return <QuizPlay testData={loadedTest} />;
    if (loadedTest.category === "psyte")
      return <PsyTestPlay testData={loadedTest} />;
    return <div>알 수 없는 테스트 유형입니다.</div>;
  }

  return (
    <>
      <AlertSnackbar message={error} severity="error" onClear={clearError} />
      <Container>
        <QuizStartContents>
          <QuizImage src={loadedTest.image} alt={loadedTest.title} />
          <QuizCategory>
            <CategoryItem>
              #{getCategoryLabel(loadedTest.category)}
            </CategoryItem>
            <CategoryItem>#{loadedTest.subject}</CategoryItem>
          </QuizCategory>
          <QuizTitle>{loadedTest.title}</QuizTitle>
          <QuizDescription>{loadedTest.description}</QuizDescription>
          <StartButton onClick={() => setPlayMode("play")}>
            시작하기
          </StartButton>
        </QuizStartContents>
      </Container>
    </>
  );
};

export default TestStart;

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
