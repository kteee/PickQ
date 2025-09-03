import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useHttpClient } from "../../shared/hooks/http-hook";
import GoogleLoginButton from "../../shared/components/GoogleLoginButton";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
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

    if (!isPrivacyAgreed) {
      newErrors.privacy = "이용약관 및 개인정보처리방침에 동의해야 합니다.";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
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
        <CheckboxWrapper>
          <input
            type="checkbox"
            id="privacy"
            checked={isPrivacyAgreed}
            onChange={(e) => setIsPrivacyAgreed(e.target.checked)}
          />
          <label htmlFor="privacy">
            <span>
              만 14세 이상이며,{" "}
              <Link to="/terms" target="_blank" rel="noopener noreferrer">
                이용약관
              </Link>{" "}
              및{" "}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                개인정보처리방침
              </Link>
              에 동의합니다.
            </span>
          </label>
        </CheckboxWrapper>
        {validationErrors.privacy && (
          <ErrorText>{validationErrors.privacy}</ErrorText>
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
        <GoogleLoginButton />
        <BottomText>
          이미 계정이 있으신가요? <LoginLink to="/login">로그인</LoginLink>
        </BottomText>
      </LoginForm>
    </LoginContainer>
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  margin-top: 10px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #50bcff;
  }

  a {
    color: #50bcff;
    text-decoration: underline;
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
  margin-top: 12px;
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
