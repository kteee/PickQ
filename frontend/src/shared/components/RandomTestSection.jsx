import styled from "styled-components";
import ShuffleSVG from "../assets/ShuffleSVG";
import SmallTestCard from "./SmallTestCard";

const RandomTestSection = ({ loadedTests, randomTests, setRandomTests }) => {
  const handleShuffle = () => {
    setRandomTests(getRandomTests(loadedTests, 4));
  };

  const getRandomTests = (arr, n) => {
    if (arr.length <= n) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <Wrapper>
      <RandomSection>
        <SectionHeader>
          <SectionTitle>추천 컨텐츠</SectionTitle>
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
    </Wrapper>
  );
};

export default RandomTestSection;

const Wrapper = styled.div`
  width: 100%;
  background-color: #f9fafb;
  box-sizing: border-box;
`;

const RandomSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0px auto 65px auto;

  @media (max-width: 1024px) {
    padding: 0 18px;
  }

  @media (max-width: 640px) {
    background-color: #ffffff;
    margin-bottom: 0px;
    padding: 4px 18px 24px 18px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 21px;
  font-weight: 600;
  color: rgb(54, 54, 54);
  margin-top: 32px;
  margin-bottom: 30px;
  padding-left: 2px;

  @media (max-width: 1024px) {
  }

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

  @media (max-width: 750px) {
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
