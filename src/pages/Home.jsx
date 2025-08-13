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
            <CategoryItem>퀴즈</CategoryItem>
            <CategoryItem>성격테스트</CategoryItem>
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
  row-gap: 30px;
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
  gap: 13px;
  flex-wrap: wrap;
`;

const CategoryItem = styled.button`
  padding: 4px 9px;
  border: none;
  border-radius: 4px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#ffffff" : "#343434")};
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "#50bcff" : "rgb(244, 244, 244)"};

  // 모바일
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
