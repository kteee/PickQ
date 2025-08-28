import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import { toast } from "sonner";
import { useHttpClient } from "./shared/hooks/http-hook";
import TestList from "./shared/components/TestList";
import SmallTestCard from "./shared/components/SmallTestCard";
import CategoryBar from "./shared/components/CategoryBar";
import ShuffleSVG from "./shared/assets/ShuffleSVG";

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

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/tests"
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

  const getRandomTests = (arr, n) => {
    if (arr.length <= n) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const handleShuffle = () => {
    setRandomTests(getRandomTests(loadedTests, 4));
  };

  const searchFiltered = loadedTests.filter((test) =>
    [test.category, test.title, test.subject]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(keyword.toLowerCase()))
  );

  return (
    <>
      <HomeContainer>
        <HomeContents $isSearchMode={isSearchMode}>
          {!isSearchMode ? (
            <>
              <RandomSection>
                <SectionHeader>
                  <SectionTitle>
                    <ShuffleIcon sx={{ fontSize: "24px" }} /> 랜덤 컨텐츠
                  </SectionTitle>
                  <ShuffleButton onClick={handleShuffle}>
                    <ShuffleIconSmall>
                      <ShuffleSVG width={17} height={14} color="gray" />
                    </ShuffleIconSmall>
                    랜덤
                  </ShuffleButton>
                </SectionHeader>
                <RandomList>
                  {randomTests.map((test) => (
                    <SmallTestCard
                      key={test.shortId}
                      id={test.shortId}
                      category={test.category}
                      image={test.image}
                      title={test.title}
                    />
                  ))}
                </RandomList>
              </RandomSection>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </HomeContents>
      </HomeContainer>
    </>
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
    background-color: ${({ $isSearchMode }) =>
      $isSearchMode ? "#ffffff" : "#f6f7f9"};
    padding: 0px;
    row-gap: 0px;
  }
`;

const RandomSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;

  @media (max-width: 640px) {
    background-color: #ffffff;
    margin-bottom: 0px;
    padding: 4px 18px 24px 18px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20.5px;
  font-weight: 500;
  color: rgb(10, 10, 10);
  margin-top: 28px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    font-size: 20px;
    font-weight: 600;
    margin-top: 19px;
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShuffleIcon = styled(ShuffleRoundedIcon)`
  color: #26a6f0;
  margin-top: 2px;
  margin-right: 7px;
`;

const ShuffleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1px;
  font-size: 14px;
  padding: 5px 10px;
  color: rgb(21, 27, 35);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 20px;
  margin-top: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgb(248, 248, 251);
  }
`;
const ShuffleIconSmall = styled.div`
  margin-top: 5px;
`;
const RandomList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 700px) {
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
  margin-top: -10px;
  box-sizing: border-box;

  @media (max-width: 920px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 0 18px;
    margin-top: 0px;
  }
`;

const NoResultText = styled.div`
  color: #525252;
  margin: 0 auto;
`;
