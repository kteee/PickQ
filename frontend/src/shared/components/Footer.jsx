import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContents>
        <FooterLeft>
          <Logo>PickQ</Logo>
          <FooterLink to="/terms">이용약관</FooterLink>
          <FooterLink to="/privacy">개인정보처리방침</FooterLink>
        </FooterLeft>
        <FooterRight>문의: kte02320@gmail.com</FooterRight>
      </FooterContents>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  font-size: 14px;
  color: #3b3b3b;
  border-top: 1px solid #eee;
  box-sizing: border-box;

  @media (max-width: 640px) {
    font-size: 8px;
    padding: 0 18px;
  }
`;

const FooterContents = styled.div`
  max-width: 1000px;
  margin: 32px auto;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 18px;
    max-width: 100vw;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const FooterRight = styled.div`
  font-size: 13.5px;
  color: #3b3b3b;
`;

const Logo = styled.div`
  font-family: "LeeSeoyun", sans-serif;
  font-weight: 600;
  font-size: 22px;
  margin-right: 7px;
  user-select: none;
  color: #26a6f0e3;
  -webkit-tap-highlight-color: transparent;
`;

const FooterLink = styled(Link)`
  color: #333;
  font-size: 13.5px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
