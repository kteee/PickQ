import styled from "styled-components";
import Header from "./shared/components/Header";
import Home from "./Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TestContainer from "./shared/components/TestContainer";
import TestResultRouter from "./shared/components/TestResultRouter";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test/:id" element={<TestContainer />} />
            <Route path="/test/:id/result" element={<TestResultRouter />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Main>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

const Layout = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 75px auto;
  grid-template-columns: 100%;
`;

const Main = styled.main`
  flex-grow: 1;
`;
