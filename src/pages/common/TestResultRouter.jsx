import { useLocation, useParams } from "react-router-dom";
import testList from "../../data/testList";
import QuizResult from "../quiz/QuizResult";
import PsyTestResult from "../psytest/PsyTestResult";

const TestResultRouter = () => {
  const { id } = useParams();
  const location = useLocation();
  const testData = testList.find((test) => test.id === Number(id));

  if (!testData) return <div>존재하지 않는 테스트입니다.</div>;

  if (testData.category === "퀴즈") {
    return <QuizResult location={location} />;
  } else if (testData.category === "심리테스트") {
    return <PsyTestResult location={location} />;
  } else {
    return <div>알 수 없는 테스트 유형입니다.</div>;
  }
};

export default TestResultRouter;
