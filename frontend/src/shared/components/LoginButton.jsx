import styled from "styled-components";
const LoginButton = () => {
  return <LoginBtn>로그인</LoginBtn>;
};

export default LoginButton;

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
`;
