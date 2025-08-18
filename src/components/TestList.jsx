import styled from "styled-components";
import TestCard from "./TestCard";
import testList from "../data/testList";

const TestList = ({ selectedCategory }) => {
  const filteredList =
    selectedCategory === "전체"
      ? testList
      : testList.filter((test) => test.category === selectedCategory);

  return (
    <ListWrapper>
      {filteredList.map((test) => (
        <TestCard key={test.id} {...test} />
      ))}
    </ListWrapper>
  );
};

export default TestList;

const ListWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 25px;

  // 태블릿
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  // 모바일
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 17px;
  }
`;
