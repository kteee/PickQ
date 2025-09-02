import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { toast } from "sonner";
import { useHttpClient } from "./shared/hooks/http-hook";
import CategoryBar from "./shared/components/CategoryBar";
import RandomTestSection from "./shared/components/RandomTestSection";
import TestList from "./shared/components/TestList";
import SmallTestCard from "./shared/components/SmallTestCard";
import Footer from "./shared/components/Footer";

const Home = () => {
  const location = useLocation();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedTests, setLoadedTests] = useState([]);
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
        setRandomTests(getRandomTests(responseData.data, 4));
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
            <RandomTestSection
              loadedTests={loadedTests}
              randomTests={randomTests}
              setRandomTests={setRandomTests}
            />
            <TestSection>
              <SectionTitle>전체 컨텐츠</SectionTitle>
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
            </TestSection>
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
                        <SmallTestCard
                          key={test.shortId}
                          isSearchMode={isSearchMode}
                          id={test.shortId}
                          category={test.category}
                          image={test.image}
                          title={test.title}
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
`;

const TestSection = styled.div`
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

  align-items: center;
  margin-top: 26px;
  padding-left: 2px;
  font-size: 21px;
  font-weight: 600;
  color: rgb(54, 54, 54);

  @media (max-width: 640px) {
    padding: 0px 18px;
  }
`;

const SearchSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 1000px) {
    padding: 0 18px;
    margin: 0px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20.5px;
  font-weight: 500;
  color: rgb(10, 10, 10);
  margin-top: 28px;
  margin-bottom: 35px;

  @media (max-width: 640px) {
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    margin-top: 19px;
    margin-bottom: 20px;
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
    gap: 18px;
    padding: 0 18px;
    margin-top: 0px;
  }
`;

const NoResultText = styled.div`
  width: 100%;
  color: #525252;
  text-align: center;
`;
