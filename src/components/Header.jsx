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
  height: 82px;
  border-bottom: 1px solid lightgray;
`;

const HeaderContents = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  height: 82px;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const Logo = styled.div`
  font-family: "LeeSeoyun", sans-serif;
  font-weight: 600;
  font-size: 30px;
  cursor: pointer;
  user-select: none;
  color: #26a6f0e3;
  -webkit-tap-highlight-color: transparent; // 모바일 터치 효과 제거
`;

const Login = styled.button`
  font-size: 14px;
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #7e7e7e;
  border-radius: 6px;
  color: #202020;
  cursor: pointer;

  &:hover {
    background-color: rgb(248, 248, 250);
  }
`;
