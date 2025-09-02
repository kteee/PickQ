import styled from "styled-components";
import GoogleSVG from "../assets/GoogleSVG";

const handleGoogleLogin = (e) => {
  e.preventDefault();
  window.location.href = `${process.env.REACT_APP_BACKEND_URL}/users/auth/google`;
};

const GoogleLoginButton = () => {
  return (
    <GoogleButton type="button" onClick={handleGoogleLogin}>
      <GoogleSVG width={20} height={20} />
      구글로 시작하기
    </GoogleButton>
  );
};

export default GoogleLoginButton;

const GoogleButton = styled.button`
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
