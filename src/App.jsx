import styled from "styled-components";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import TestContainer from "./pages/common/TestContainer";
import TestResultRouter from "./pages/common/TestResultRouter";

function App() {
  return (
    <Layout>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:id" element={<TestContainer />} />
          <Route path="/test/:id/result" element={<TestResultRouter />} />
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
