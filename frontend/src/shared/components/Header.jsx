import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import PCSearchBar from "./PCSearchBar";
import MobileSearchBar from "./MobileSearchBar";

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
          <PCSearchBar />
          <MobileSearchBar />
          <AuthButton />
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
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 18px;
  }

  @media (max-width: 640px) {
    padding: 0 16px;
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

  @media (max-width: 1024px) {
    font-size: 28px;
  }
`;

const RightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
