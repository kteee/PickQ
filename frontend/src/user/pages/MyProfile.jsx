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

  const [nickname, setNickname] = useState("게스트");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {});

  const validate = () => {
    const newErrors = {};

    if (nickname.trim().length < 2) {
      newErrors.nickname = "닉네임은 2자 이상 입력해주세요.";
    }

    if (newPassword.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // if (validate()) {
    //   try {
    //     await sendRequest(
    //       "http://localhost:5000/api/user/register",
    //       "PATCH",
    //       JSON.stringify({ nickname, currentPassword, newPassword }),
    //       { "Content-Type": "application/json" }
    //     );
    //     navigate("/");
    //   } catch (err) {}
    // }
  };

  return (
    <MyProfileContainer>
      <HeaderTitle>내 정보</HeaderTitle>
      <Section>
        <SectionTitle>닉네임 변경</SectionTitle>
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="새 닉네임"
        />
        <ActionButton>닉네임 변경</ActionButton>
      </Section>
      <Divider />
      <Section>
        <SectionTitle>비밀번호 변경</SectionTitle>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="현재 비밀번호를 입력하세요"
        />
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호를 다시 입력하세요"
        />
        <ActionButton>비밀번호 변경</ActionButton>
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

const Section = styled.div`
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
