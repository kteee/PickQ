import styled from "styled-components";
import Header from "./components/Header";
import Home from "./pages/Home";
import QuizResult from "./pages/quiz/QuizResult";
import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/quiz/Quiz";

function App() {
  return (
    <Layout>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/quiz/:id/result" element={<QuizResult />} />
        </Routes>
      </Main>
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 82px auto;
  grid-template-columns: 100%;
`;

const Main = styled.main`
  flex-grow: 1;
`;
