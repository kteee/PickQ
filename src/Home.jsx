import styled from "styled-components";
import TestList from "./shared/components/TestList";
import testListData from "./shared/data/testListData";
import { useState } from "react";

const CATEGORIES = ["전체", "퀴즈", "심리테스트"];

const Home = () => {
  const [selectedCate, setSelectedCate] = useState("전체");

  return (
    <HomeContainer>
      <HomeContents>
        <PopularSection>dd</PopularSection>
        <CategoryBar>
          <Category>
            {CATEGORIES.map((category) => (
              <CategoryItem
                key={category}
                onClick={() => {
                  setSelectedCate(category);
                }}
                selected={selectedCate === category}
              >
                {category}
              </CategoryItem>
            ))}
          </Category>
        </CategoryBar>
        <TestList testListData={testListData} selectedCategory={selectedCate} />
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: grid;
`;

const HomeContents = styled.div`
  width: 100%;
  max-width: 980px;
  box-sizing: border-box;
  margin: 0px auto 50px auto;
  display: grid;
  row-gap: 30px;
  //padding: 0px 18px;

  // 모바일
  @media (max-width: 640px) {
    background-color: #f6f7f9;
    row-gap: 17px;
    padding: 0px;
  }
`;

const PopularSection = styled.div``;

const CategoryBar = styled.div`
  display: flex;
  height: 65px;
  margin-top: 25px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    background-color: #ffffff;
    padding: 0 18px;
  }
`;

const Category = styled.div`
  display: flex;
  gap: 11px;
  flex-wrap: wrap;
`;

const CategoryItem = styled.button`
  padding: 4px 9px;
  border: none;
  border-radius: 4px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: ${({ selected }) => (selected ? "#ffffff" : "#343434")};
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "#50bcff" : "rgb(245, 245, 249)"};

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
