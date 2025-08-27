import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const MyProfile = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [user, setUser] = useState();
  const [nickname, setNickname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const id = "68ac3b5b23431dfa6e9b434c";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/${id}`
        );
        setUser(responseData.data);
        setNickname(responseData.data.nickname);
      } catch (err) {}
    };

    fetchUser();
  }, [id, sendRequest]);

  const nicknameValidate = () => {
    const newErrors = {};

    if (nickname.trim().length < 2) {
      newErrors.nickname = "닉네임은 2자 이상 입력해주세요.";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const passwordValidate = () => {
    const newErrors = {};

    if (newPassword.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateNickname = async (e) => {
    e.preventDefault();

    if (nicknameValidate()) {
      try {
        await sendRequest(
          `http://localhost:5000/api/user/${id}`,
          "PATCH",
          JSON.stringify({
            nickname,
          }),
          { "Content-Type": "application/json" }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <MyProfileContainer>
      <HeaderTitle>내 정보</HeaderTitle>
      <Section onSubmit={handleUpdateNickname} noValidate>
        <SectionTitle>닉네임 변경</SectionTitle>
        <Input
          type="text"
          maxlength="10"
          value={nickname}
          autoComplete="off"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="새 닉네임"
        />
        {validationErrors.nickname && (
          <ErrorText>{validationErrors.nickname}</ErrorText>
        )}
        <ActionButton type="submit">닉네임 변경</ActionButton>
      </Section>
      <Divider />
      <Section>
        <SectionTitle>비밀번호 변경</SectionTitle>
        <Input
          type="password"
          value={currentPassword}
          autoComplete="off"
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="현재 비밀번호를 입력하세요"
        />
        <Input
          type="password"
          value={newPassword}
          autoComplete="off"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
        />
        <Input
          type="password"
          value={confirmPassword}
          autoComplete="off"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호를 다시 입력하세요"
        />
        <ActionButton type="submit">비밀번호 변경</ActionButton>
      </Section>
      <Divider />
      <BottomText>
        <LinkButton>로그아웃</LinkButton>|<LinkButton>회원탈퇴</LinkButton>
      </BottomText>
    </MyProfileContainer>
  );
};

export default MyProfile;

const MyProfileContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 60px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 640px) {
    margin: 0px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const Section = styled.form`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 18px;
`;

const Input = styled.input`
  padding: 13px 16px;
  border-radius: 20px;
  border: none;
  background-color: #f5f5f7;
  font-size: 14px;
  outline: none;
  margin-bottom: 14px;

  &::placeholder {
    color: #aaa;
  }
`;

const Divider = styled.div`
  margin-bottom: 15px;
`;

const ActionButton = styled.button`
  padding: 13px;
  border: none;
  border-radius: 999px;
  background-color: ${({ $loading }) => ($loading ? "#acdbf8" : " #50bcff")};
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "default" : "pointer")};
`;

const BottomText = styled.div`
  margin-top: 18px;
  text-align: center;
  font-size: 13px;
  color: #666;
`;

const LinkButton = styled.button`
  margin: 0px 3px;
  color: #50bcff;
  font-weight: 500;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.div`
  font-size: 12px;
  color: #ff4444;
  margin-top: -6px;
  margin-left: 6px;
  margin-bottom: 15px;
`;
