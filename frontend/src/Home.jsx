import styled from "styled-components";
import TestList from "./shared/components/TestList";
import testListData from "./shared/data/testListData";
import PopularContentCard from "./shared/components/PopularContentCard";
import { useState } from "react";
import Img01 from "./shared/assets/quiz01.png";
import Img04 from "./shared/assets/quiz04.png";
import Img05 from "./shared/assets/quiz05.png";
import Img07 from "./shared/assets/test01.png";

const CATEGORIES = ["전체", "퀴즈", "심리테스트"];

const POPULAR_CONTENTS = [Img01, Img04, Img05, Img07];

const Home = () => {
  const [selectedCate, setSelectedCate] = useState("전체");

  return (
    <HomeContainer>
      <HomeContents>
        <PopularSection>
          <SectionTitle>인기 컨텐츠</SectionTitle>
          <PopularList>
            {POPULAR_CONTENTS.map((image) => (
              <PopularContentCard
                image={image}
                title={"테토남/에겐남 테스트"}
              />
            ))}
          </PopularList>
        </PopularSection>
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
  max-width: 1000px;
  box-sizing: border-box;
  margin: 0px auto 50px auto;
  display: grid;
  row-gap: 30px;

  // 모바일
  @media (max-width: 640px) {
    background-color: #f6f7f9;
    row-gap: 17px;
    padding: 0px 18px;
  }
`;

const PopularSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  font-size: 21px;
  font-weight: 500;
  color: rgb(10, 10, 10);
  margin-top: 30px;
  margin-bottom: 22px;

  @media (max-width: 640px) {
    font-size: 19px;
    margin-top: 15px;
  }
`;

const PopularList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 17px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

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
