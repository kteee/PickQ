import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderContents>
        <Logo onClick={handleLogoClick}>PickQ</Logo>
        <Login>로그인</Login>
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid lightgray;
`;

const HeaderContents = styled.div`
  display: flex;
  max-width: 980px;
  margin: 0 auto;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
`;

const Logo = styled.div`
  font-family: "LeeSeoyun", sans-serif;
  font-weight: 600;
  font-size: 30px;
  cursor: pointer;
  user-select: none;
  color: #26a6f0e3;
  -webkit-tap-highlight-color: transparent;
`;

const Login = styled.button`
  font-size: 14px;
  padding: 7px 15px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 20px;
  color: rgb(13, 17, 23);

  &:hover {
    background-color: rgb(248, 248, 251);
  }
`;
