import React from "react";
import styled from "styled-components";
import QuizList from "../components/QuizList";

const Home = () => {
  return (
    <HomeWrapper>
      <Contents>
        <AdBanner>광고영역</AdBanner>
        <CategoryBar>
          <Category>
            <CategoryItem>전체</CategoryItem>
            <CategoryItem>상식퀴즈</CategoryItem>
            <CategoryItem>초성퀴즈</CategoryItem>
            <CategoryItem>맞춤법퀴즈</CategoryItem>
          </Category>
        </CategoryBar>
        <QuizList />
      </Contents>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: grid;
  border-top: 1px solid lightgray;
`;

const Contents = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: grid;
  row-gap: 25px;
`;

const AdBanner = styled.div`
  height: 120px;
`;

const CategoryBar = styled.div`
  display: flex;
  height: 70px;
  font-size: 17px;
  justify-content: space-between;
  align-items: center;
`;

const Category = styled.div`
  display: flex;
  gap: 15px;
`;

const CategoryItem = styled.div`
  //background-color: #b1dffacf;
  padding: 0 1px;
`;
