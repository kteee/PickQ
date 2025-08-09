import React from "react";
import styled from "styled-components";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Home />
      </Main>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 82px auto;
  grid-template-columns: 100%;
`;

const Main = styled.main`
  flex-grow: 1;
`;
