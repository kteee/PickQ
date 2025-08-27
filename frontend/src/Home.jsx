import { useEffect, useState } from "react";
import styled from "styled-components";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import { useHttpClient } from "./shared/hooks/http-hook";
import TestList from "./shared/components/TestList";
import RandomTestCard from "./shared/components/RandomTestCard";
import CategoryBar from "./shared/components/CategoryBar";
import AlertSnackbar from "./shared/components/AlertSnackbar";
import ShuffleSVG from "./shared/assets/ShuffleSVG";

const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedTests, setLoadedTests] = useState([]);
  const [randomTests, setRandomTests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const getRandomTests = (arr, n) => {
    if (arr.length <= n) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  const handleShuffle = () => {
    setRandomTests(getRandomTests(loadedTests, 4));
  };

  return (
    <>
      <AlertSnackbar message={error} severity="error" onClear={clearError} />
      <HomeContainer>
        <HomeContents>
          <RandomSection>
            <SectionHeader>
              <SectionTitle>
                <ShuffleIcon sx={{ fontSize: "24px" }} /> 랜덤 컨텐츠
              </SectionTitle>
              <ShuffleButton onClick={handleShuffle}>
                <ShuffleSVG width={17} height={14} color="gray" /> 랜덤
              </ShuffleButton>
            </SectionHeader>
            <RandomList>
              {randomTests.map((test, index) => (
                <RandomTestCard
                  key={index}
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
    background-color: #f6f7f9;
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
  margin-top: 32px;
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
`;

const ShuffleIcon = styled(ShuffleRoundedIcon)`
  color: #26a6f0;
  margin-top: 2px;
  margin-right: 7px;
`;

const ShuffleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14.5px;
  padding: 6px 10px;
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

const RandomList = styled.div`
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
