import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/PersonOutlineRounded";

const AuthButton = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return isLoggedIn ? (
    <ProfileSection
      onClick={() => {
        navigate("/myprofile");
      }}
    >
      <ProfileIcon fontSize="large" />
    </ProfileSection>
  ) : (
    <LoginBtn
      onClick={() => {
        navigate("/login");
      }}
    >
      로그인
    </LoginBtn>
  );
};

export default AuthButton;

const LoginBtn = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  padding: 7px 15px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 20px;
  color: rgb(13, 17, 23);
  cursor: pointer;

  &:hover {
    background-color: rgb(248, 248, 251);
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 6px 14px;
  }
`;

const ProfileSection = styled.div`
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

const ProfileIcon = styled(PersonIcon)`
  color: #383838;
  cursor: pointer;
  padding: 5px;

  &:hover {
    color: #1f1f1f;
  }
`;
