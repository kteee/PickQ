import styled from "styled-components";
import TestCard from "./TestCard";

const TestList = ({ testListData, selectedCategory }) => {
  const filteredList =
    selectedCategory === "전체"
      ? testListData
      : testListData.filter((test) => test.category === selectedCategory);

  if (filteredList.length === 0) {
    return <EmptyMessage>표시할 항목이 없습니다.</EmptyMessage>;
  }

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

const EmptyMessage = styled.div`
  width: 100%;
  font-size: 17px;

  text-align: center;
  padding: 40px 0;
  color: #666;
`;
