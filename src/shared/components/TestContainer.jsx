import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import TestStart from "./TestStart";
import testList from "../data/testListData";
import QuizPlay from "../../quiz/pages/QuizPlay";
import PsyTestPlay from "../../quiz/pages/PsyTestPlay";

const TestContainer = () => {
  const { id } = useParams();
  const testData = testList.find((test) => test.id === Number(id));
  const [playMode, setPlayMode] = useState("start");

  if (!testData) return <div>존재하지 않는 테스트입니다.</div>;

  const renderContent = () => {
    if (playMode === "start") {
      return (
        <TestStart testData={testData} onStart={() => setPlayMode("play")} />
      );
    }
    if (testData.category === "퀴즈") {
      return <QuizPlay testData={testData} />;
    } else if (testData.category === "심리테스트") {
      return <PsyTestPlay testData={testData} />;
    }
  };

  return <Container>{renderContent()}</Container>;
};

export default TestContainer;

const Container = styled.div`
  max-width: 980px;
  margin: 0px auto 50px auto;
`;
