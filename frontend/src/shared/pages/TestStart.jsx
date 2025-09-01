import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useHttpClient } from "../hooks/http-hook";
import { getCategoryLabel } from "../data/category";
import { AuthContext } from "../../shared/context/auth-context";
import QuizPlay from "../../quiz/pages/QuizPlay";
import PsyTestPlay from "../../psytest/pages/PsyTestPlay";
import CommentSection from "../../shared/components/CommentSection";

const TestStart = () => {
  const { id } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { isLoggedIn } = useContext(AuthContext);

  const [loadedTest, setLoadedTest] = useState();
  const [playMode, setPlayMode] = useState("start");

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    const fetchTest = async () => {
      console.log("🔥 fetchTest triggered by id:", id);
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tests/${id}`
        );
        setLoadedTest(responseData.data);
      } catch (err) {}
    };

    fetchTest();
  }, [id, sendRequest]);

  if (isLoading || !loadedTest) {
    return null;
  }

  if (playMode === "play") {
    if (loadedTest.category === "quiz")
      return <QuizPlay testData={loadedTest} />;
    if (loadedTest.category === "psytest")
      return <PsyTestPlay testData={loadedTest} />;
    return <div>알 수 없는 테스트 유형입니다.</div>;
  }

  return (
    <Container>
      <QuizStartContents>
        <QuizImage src={loadedTest.image} alt={loadedTest.title} />
        <QuizCategory>
          <CategoryItem>#{getCategoryLabel(loadedTest.category)}</CategoryItem>
          <CategoryItem>#{loadedTest.subject}</CategoryItem>
        </QuizCategory>
        <QuizTitle>{loadedTest.title}</QuizTitle>
        <QuizDescription>{loadedTest.description}</QuizDescription>
        <StartButton onClick={() => setPlayMode("play")}>시작하기</StartButton>
        <CommentSection id={id} isLoggedIn={isLoggedIn} />
      </QuizStartContents>
    </Container>
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
