import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import styled from "styled-components";
import Header from "./shared/components/Header";
import Home from "./Home";
import QuizStart from "./shared/components/QuizStart";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import QuizResult from "./quiz/pages/QuizResult";
import PsyTestResult from "./quiz/pages/PsyTestResult";
import MyProfile from "./user/pages/MyProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <Layout>
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user/:id" element={<MyProfile />} />
              <Route path="/quiz/:id" element={<QuizStart />} />
              <Route path="/quiz/result/:id" element={<QuizResult />} />
              <Route path="/psytest/:id" element={<QuizStart />} />
              <Route path="/psytest/:id/result" element={<PsyTestResult />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Main>
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
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
