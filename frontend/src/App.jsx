import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import { Toaster } from "sonner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import Header from "./shared/components/Header";
import Home from "./Home";
import TermsOfService from "./shared/pages/TermsOfService";
import PrivacyPolicy from "./shared/pages/PrivacyPolicy";
import OAuth2RedirectHandler from "./shared/components/OAuth2RedirectHandler";

const Login = lazy(() => import("./user/pages/Login"));
const Signup = lazy(() => import("./user/pages/Signup"));
const TestStart = lazy(() => import("./shared/pages/TestStart"));
const QuizResult = lazy(() => import("./quiz/pages/QuizResult"));
const PsyTestResult = lazy(() => import("./psytest/pages/PsyTestResult"));
const MyProfile = lazy(() => import("./user/pages/MyProfile"));

function App() {
  const { token, login, logout, userId, authReady } = useAuth();

  if (!authReady) {
    return null;
  }

  return (
    <>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontFamily: "Noto Sans KR, sans-serif",
            marginTop: "18px",
            minWidth: "380px",
            boxShadow: "none",
          },
        }}
      />
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <BrowserRouter>
          <Layout>
            <Header />
            <Suspense fallback={null}>
              <Main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/myprofile" element={<MyProfile />} />
                  <Route path="/quiz/:id" element={<TestStart />} />
                  <Route path="/quiz/result/:id" element={<QuizResult />} />
                  <Route path="/psytest/:id" element={<TestStart />} />
                  <Route
                    path="/psytest/result/:id"
                    element={<PsyTestResult />}
                  />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route
                    path="/oauth2/redirect"
                    element={<OAuth2RedirectHandler />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Main>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
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
