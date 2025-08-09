import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>PickQ</Logo>
      <Login>로그인</Login>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  width: 1100px;
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
`;

const Login = styled.button`
  font-size: 14px;
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #7e7e7e;
  border-radius: 6px;
  color: #4b4b4b;
  cursor: pointer;

  &:hover {
    background-color: rgb(248, 248, 250);
  }
`;
