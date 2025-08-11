import React from "react";
import styled from "styled-components";
import QuizList from "../components/QuizList";

const Home = () => {
  return (
    <HomeContainer>
      <HomeContents>
        <AdBanner>광고영역</AdBanner>
        <CategoryBar>
          <Category>
            <CategoryItem selected>전체</CategoryItem>
            <CategoryItem>상식퀴즈</CategoryItem>
            <CategoryItem>초성퀴즈</CategoryItem>
            <CategoryItem>국어퀴즈</CategoryItem>
            <CategoryItem>추억퀴즈</CategoryItem>
          </Category>
        </CategoryBar>
        <QuizList />
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: grid;
`;

const HomeContents = styled.div`
  max-width: 1100px;
  margin: 0px auto 50px auto;
  display: grid;
  row-gap: 25px;
  padding: 0 16px;
`;

const AdBanner = styled.div`
  height: 120px;
`;

const CategoryBar = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;
`;

const Category = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CategoryItem = styled.button`
  padding: 4px 9px;
  border: none;
  border-radius: 4px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: #343434;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#b3e1fd" : "transparent")};

  &:hover {
    background-color: ${({ selected }) =>
      selected ? "" : "rgb(240, 240, 240)"};
  }
`;
