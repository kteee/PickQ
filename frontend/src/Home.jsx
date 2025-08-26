import { useEffect, useState } from "react";
import styled from "styled-components";
import TrendingUpIcon from "@mui/icons-material/TrendingUpRounded";
import QuizList from "./shared/components/QuizList";
import PopularContentCard from "./shared/components/PopularContentCard";
import CategoryBar from "./shared/components/CategoryBar";
import { useHttpClient } from "./shared/hooks/http-hook";
import Img07 from "./shared/assets/test01.png";
import Img04 from "./shared/assets/quiz04.png";
import Img05 from "./shared/assets/quiz05.png";

const POPULAR_CONTENTS = [Img07, Img04, Img05, Img07];

const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedQuizzes, setLoadedQuizzes] = useState();
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/quiz"
        );
        setLoadedQuizzes(responseData.data);
      } catch (err) {}
    };

    fetchQuizzes();
  }, [sendRequest]);

  const errorHandler = () => {
    clearError();
  };

  return (
    <HomeContainer>
      <HomeContents>
        <PopularSection>
          <SectionTitle>
            <TrendingIcon sx={{ fontSize: "27px" }} />
            인기 컨텐츠
          </SectionTitle>
          <PopularList>
            {POPULAR_CONTENTS.map((image) => (
              <PopularContentCard
                image={image}
                title={"테토남/에겐남 테스트dddd ff"}
              />
            ))}
          </PopularList>
        </PopularSection>
        <CategoryBar
          selectedCate={selectedCategory}
          setSelectedCate={setSelectedCategory}
        />
        {!isLoading && loadedQuizzes && (
          <QuizList
            quizData={loadedQuizzes}
            selectedCategory={selectedCategory}
          />
        )}
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
  max-width: 1020px;
  box-sizing: border-box;
  margin: 0px auto 50px auto;
  display: grid;
  row-gap: 15px;

  // 태블릿
  @media (max-width: 1024px) {
    padding: 0 18px;
    box-sizing: border-box;
  }

  // 모바일
  @media (max-width: 640px) {
    background-color: #f6f7f9;
    padding: 0px;
    row-gap: 0px;
  }
`;

const PopularSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;

  @media (max-width: 640px) {
    background-color: #ffffff;
    margin-bottom: 0px;
    padding: 4px 18px 24px 18px;
  }
`;

const TrendingIcon = styled(TrendingUpIcon)`
  color: #26a6f0e3;
  margin-right: 7px;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20.5px;
  font-weight: 500;
  color: rgb(10, 10, 10);
  margin-top: 32px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    font-size: 20px;
    font-weight: 600;
    margin-top: 19px;
    margin-bottom: 20px;
  }
`;

const PopularList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    display: flex;
    overflow-x: auto;
    max-width: 100%;
    box-sizing: border-box;
    contain: content;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 15px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
