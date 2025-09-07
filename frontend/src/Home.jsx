import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { toast } from "sonner";
import { useHttpClient } from "./shared/hooks/http-hook";
import CategoryBar from "./shared/components/CategoryBar";
import RecommendedSection from "./shared/components/RecommendedSection";
import TestList from "./shared/components/TestList";
import TestCard from "./shared/components/TestCard";
import Footer from "./shared/components/Footer";
import RandomSection from "./shared/components/RandomSection";

const Home = () => {
  const location = useLocation();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedTests, setLoadedTests] = useState([]);
  const [recommendedTests, setRecommendedTests] = useState([]);
  const [randomTests, setRandomTests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 검색 키워드
  const queryParams = new URLSearchParams(location.search);
  const keyword = (queryParams.get("keyword") || "").trim();
  const isSearchMode = keyword.length > 0;

  const getRandomTests = (arr, n) => {
    if (arr.length <= n) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const searchFiltered = loadedTests.filter((test) =>
    [test.category, test.title, test.subject]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(keyword.toLowerCase()))
  );

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tests`
        );
        setLoadedTests(responseData.data);
        setRecommendedTests(
          responseData.data.filter((test) => test.recommend === true)
        );
      } catch (err) {}
    };

    fetchTests();
  }, [sendRequest]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <HomeContainer>
      <HomeContents $isSearchMode={isSearchMode}>
        {!isSearchMode ? (
          <>
            <RecommendedSection
              loadedTests={loadedTests}
              recommendedTests={recommendedTests}
            />
            <RandomSection loadedTests={loadedTests} />
            <TestListSection>
              <SectionTitle>전체 콘텐츠</SectionTitle>
              <CategoryBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              {!isLoading && loadedTests && (
                <TestList
                  testData={loadedTests}
                  selectedCategory={selectedCategory}
                />
              )}
            </TestListSection>
            <Footer />
          </>
        ) : (
          <>
            <SearchSection>
              <SectionHeader>
                <SearchTitle>검색 결과</SearchTitle>
              </SectionHeader>

              {!isLoading && (
                <>
                  {searchFiltered.length > 0 ? (
                    <SearchResultList>
                      {searchFiltered.map((test) => (
                        <TestCard
                          key={test.shortId}
                          shortId={test.shortId}
                          category={test.category}
                          image={test.image}
                          title={test.title}
                          description={test.description}
                        />
                      ))}
                    </SearchResultList>
                  ) : (
                    <NoResultText>검색 결과가 없습니다.</NoResultText>
                  )}
                </>
              )}
            </SearchSection>
          </>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  row-gap: 15px;

  @media (max-width: 1024px) {
    max-width: 100vw;
  }
`;

const TestListSection = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 800px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    padding: 0 18px;
    margin: 0px;
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 0px;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  font-size: 23px;
  font-weight: 600;
  align-items: center;
  margin-top: 24px;
  padding-left: 2px;
  color: #2e3238;

  @media (max-width: 640px) {
    font-size: 23px;
    padding: 0px 16px;
    margin-top: 5px;
  }
`;

const SearchSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  font-weight: 600;
  color: #2e3238;
  margin-top: 30px;
  margin-bottom: 35px;

  @media (max-width: 640px) {
    width: 100%;
    font-size: 23px;
    font-weight: 600;
    margin-top: 23px;
    margin-bottom: 10px;
  }
`;

const SearchTitle = styled.div`
  padding: 4.5px 2px;

  @media (max-width: 640px) {
    padding: 0 18px;
  }
`;

const SearchResultList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
  margin-top: -5px;
  box-sizing: border-box;

  @media (max-width: 920px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2px;
    margin-top: 0px;
  }
`;

const NoResultText = styled.div`
  width: 100%;
  color: #525252;
  text-align: center;
`;
