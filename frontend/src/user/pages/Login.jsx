import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "sonner";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import GoogleLoginButton from "../../shared/components/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const hasShownToast = useRef(false);

  // 회원가입 완료 시 메세지
  useEffect(() => {
    if (location.state?.successMessage && !hasShownToast.current) {
      toast.success(location.state.successMessage);
      hasShownToast.current = true;
    }
  }, [location.state]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const validate = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (password.length < 6) {
      newErrors.password = "비밀번호를 6자 이상 입력해주세요.";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({ email, password }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.data.userId, responseData.data.token);
        navigate("/");
      } catch (err) {}
    }
  };

  return (
    <LoginContainer>
      <HeaderTitle>로그인</HeaderTitle>
      <LoginForm onSubmit={handleLogin} noValidate>
        <Input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {validationErrors.email && (
          <ErrorText>{validationErrors.email}</ErrorText>
        )}
        <Input
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {validationErrors.password && (
          <ErrorText>{validationErrors.password}</ErrorText>
        )}
        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size="18px" color="inherit" />
          ) : (
            "로그인"
          )}
        </LoginButton>
        <Divider>
          <Line />
          <DividerText>또는</DividerText>
          <Line />
        </Divider>
        <GoogleLoginButton />
        <BottomText>
          계정이 없으신가요? <JoinLink to="/signup">회원가입</JoinLink>
        </BottomText>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 60px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 640px) {
    max-width: 100%;
    margin: 0px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 23px;

  @media (max-width: 640px) {
    margin-top: 25px;
    font-size: 22px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Input = styled.input`
  padding: 13px 16px;
  border-radius: 20px;
  border: none;
  background-color: #f5f5f7;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const LoginButton = styled.button`
  padding: 13px;
  border: none;
  border-radius: 999px;
  background-color: ${({ disable }) => (disable ? "#acdbf8" : " #50bcff")};
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: ${({ disable }) => (disable ? "default" : "pointer")};
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: #ccc;
`;

const DividerText = styled.span`
  font-size: 13px;
  color: #999;
`;

const BottomText = styled.div`
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  color: #666;
`;

const JoinLink = styled(Link)`
  margin-left: 4px;
  color: #50bcff;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #ff4444;
  margin-top: -6px;
  margin-left: 6px;
  margin-bottom: 2px;
`;
