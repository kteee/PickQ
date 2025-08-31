import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useHttpClient } from "../../shared/hooks/http-hook";
import GoogleSVG from "../../shared/assets/GoogleSVG";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    if (nickname.trim().length < 2) {
      newErrors.nickname = "닉네임은 2자 이상 입력해주세요.";
    }

    if (password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({ email, nickname, password }),
          { "Content-Type": "application/json" }
        );

        navigate("/login", {
          state: { successMessage: "회원가입이 완료되었습니다." },
        });
      } catch (err) {}
    }
  };

  return (
    <>
      <LoginContainer>
        <HeaderTitle>회원가입</HeaderTitle>
        <LoginForm onSubmit={handleRegister} noValidate>
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
            type="text"
            maxLength="10"
            placeholder="닉네임을 입력하세요 (2자 이상)"
            autoComplete="off"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {validationErrors.nickname && (
            <ErrorText>{validationErrors.nickname}</ErrorText>
          )}
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요 (6자 이상)"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors.password && (
            <ErrorText>{validationErrors.password}</ErrorText>
          )}
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {validationErrors.confirmPassword && (
            <ErrorText>{validationErrors.confirmPassword}</ErrorText>
          )}
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size="18px" color="inherit" />
            ) : (
              "회원가입"
            )}
          </LoginButton>
          <Divider>
            <Line />
            <DividerText>또는</DividerText>
            <Line />
          </Divider>
          <GoogleLoginButton>
            <GoogleSVG width={20} height={20} /> 구글로 시작하기
          </GoogleLoginButton>
          <BottomText>
            이미 계정이 있으신가요? <LoginLink to="/login">로그인</LoginLink>
          </BottomText>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default Signup;

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
  background-color: ${({ disabled }) => (disabled ? "#acdbf8" : " #50bcff")};
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
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

const GoogleLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 999px;
  background-color: white;
  color: #111;
  font-size: 14px;
  cursor: pointer;
`;

const BottomText = styled.div`
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  color: #666;
`;

const LoginLink = styled(Link)`
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
