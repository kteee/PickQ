import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContents>
        <FooterTop>
          <Logo>PickQ</Logo>
        </FooterTop>
        <FooterDescription>
          PickQ는 다양한 퀴즈와 심리테스트 콘텐츠를 제공하는 서비스입니다.
        </FooterDescription>
        <FooterBottom>
          <FooterLink to="/terms">이용약관</FooterLink>
          <FooterLink to="/privacy">개인정보처리방침</FooterLink>
          <div>문의: kte02320@gmail.com</div>
        </FooterBottom>
      </FooterContents>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  font-size: 13.5px;
  color: #3b3b3b;
  border-top: 1px solid #eee;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 0 18px;
  }
`;

const FooterContents = styled.div`
  max-width: 1000px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
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

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FooterDescription = styled.div`
  font-size: 14.5px;
  color: #3b3b3b;
  margin: 15px 0px;

  @media (max-width: 640px) {
    display: block;
    margin: 8px 0;
    font-size: 13.5px;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    font-size: 13px;
  }
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
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
