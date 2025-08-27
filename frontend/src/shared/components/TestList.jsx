import styled from "styled-components";
import TestCard from "./TestCard";

const TestList = ({ testData, selectedCategory }) => {
  const filteredList =
    selectedCategory === "all"
      ? testData
      : testData.filter((test) => test.category === selectedCategory);

  if (filteredList.length === 0) {
    return <EmptyMessage>표시할 항목이 없습니다.</EmptyMessage>;
  }

  return (
    <ListWrapper>
      {filteredList.map((test) => (
        <TestCard key={test.shortId} {...test} />
      ))}
    </ListWrapper>
  );
};

export default TestList;

const ListWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;

  // 태블릿
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  // 모바일
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 13px;
  }
`;

const EmptyMessage = styled.div`
  width: 100%;
  font-size: 17px;
  text-align: center;
  padding: 40px 0;
  color: #666;
`;
