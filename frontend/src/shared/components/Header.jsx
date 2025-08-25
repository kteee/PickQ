import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <HeaderContents>
        <Logo onClick={handleLogoClick}>PickQ</Logo>
        <RightSection>
          <SearchBar />
          <LoginButton />
        </RightSection>
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgb(229, 231, 235);

  @media (max-width: 640px) {
    border-bottom: 1px solid #000000;
  }
`;

const HeaderContents = styled.div`
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  height: 100%;
  justify-content: space-between;
  align-items: center;
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

const RightSection = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
