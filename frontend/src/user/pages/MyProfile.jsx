import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "../../shared/styles/swal-custom.css";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const MyProfile = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const { error, sendRequest, clearError } = useHttpClient();
  const [isNicknameLoading, setIsNicknameLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [user, setUser] = useState();
  const [initialNickname, setInitialNickname] = useState("");
  const [nickname, setNickname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  let successMessage;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setUser(responseData.data);
        setInitialNickname(responseData.data.nickname);
        setNickname(responseData.data.nickname);
      } catch (err) {}
    };

    fetchUser();
  }, [sendRequest, auth.token]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const nicknameValidate = () => {
    const newErrors = {};

    if (nickname.trim().length < 2) {
      newErrors.nickname = "닉네임은 2자 이상 입력해주세요.";
    }

    if (initialNickname === nickname) {
      newErrors.nickname = "현재 닉네임과 다른 닉네임을 입력해주세요.";
    }

    setValidationErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const passwordValidate = () => {
    const newErrors = {};

    if (newPassword.length < 6) {
      newErrors.newPassword = "비밀번호는 최소 6자 이상이어야 합니다.";
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
      setIsNicknameLoading(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
          "PATCH",
          JSON.stringify({
            nickname,
          }),
          {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          }
        );
        setInitialNickname(nickname);
        successMessage = "닉네임이 변경되었습니다.";
        toast.success(successMessage);
      } catch (err) {}
      setIsNicknameLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordValidate()) {
      setIsPasswordLoading(true);
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
          "PATCH",
          JSON.stringify({
            currentPassword,
            newPassword,
          }),
          {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          }
        );

        successMessage = "비밀번호가 변경되었습니다.";
        toast.success(successMessage);
      } catch (err) {}
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsPasswordLoading(false);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "회원탈퇴를 진행하시겠습니까?",
      width: 340,
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소",
      confirmButtonColor: "rgb(80, 188, 255)",
      cancelButtonColor: "#b1b1b1",
      customClass: {
        title: "swal-title",
        htmlContainer: "swal-text",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    });

    if (result.isConfirmed) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/profile`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        navigate("/");
        auth.logout();
        await Swal.fire({
          title: "회원탈퇴가 완료되었습니다.",
          width: 330,
          confirmButtonText: "확인",
          confirmButtonColor: "rgb(80, 188, 255)",
          customClass: {
            title: "swal-title",
            htmlContainer: "swal-text",
            confirmButton: "swal-confirm",
            cancelButton: "swal-cancel",
          },
        });
      } catch (err) {}
    }
  };

  if (!user) {
    return null;
  }

  return (
    <MyProfileContainer>
      <HeaderTitle>내 정보</HeaderTitle>
      <Section onSubmit={handleUpdateNickname} noValidate>
        <SectionTitle>닉네임 변경</SectionTitle>
        <Input
          type="text"
          maxLength="10"
          value={nickname}
          autoComplete="off"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="새 닉네임"
        />
        {validationErrors.nickname && (
          <ErrorText>{validationErrors.nickname}</ErrorText>
        )}
        <ActionButton type="submit" disabled={isNicknameLoading}>
          {isNicknameLoading ? (
            <CircularProgress size="18px" color="inherit" />
          ) : (
            "닉네임 변경"
          )}
        </ActionButton>
      </Section>
      <Divider />
      <Section onSubmit={handleUpdatePassword} noValidate>
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
        {validationErrors.newPassword && (
          <ErrorText>{validationErrors.newPassword}</ErrorText>
        )}
        <Input
          type="password"
          value={confirmPassword}
          autoComplete="off"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="새 비밀번호를 다시 입력하세요"
        />
        {validationErrors.confirmPassword && (
          <ErrorText>{validationErrors.confirmPassword}</ErrorText>
        )}
        <ActionButton type="submit" disabled={isPasswordLoading}>
          {isPasswordLoading ? (
            <CircularProgress size="18px" color="inherit" />
          ) : (
            "비밀번호 변경"
          )}
        </ActionButton>
      </Section>
      <Divider />
      <BottomText>
        <LinkButton onClick={handleLogout}>로그아웃</LinkButton>|
        <LinkButton onClick={handleDeleteAccount}>회원탈퇴</LinkButton>
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
    max-width: 100%;
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
  background-color: ${({ disabled }) => (disabled ? "#acdbf8" : " #50bcff")};
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
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
