import styled from "styled-components";
import { CATEGORIES } from "../../shared/data/category";

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Wrapper>
      <Category>
        {CATEGORIES.map((category) => (
          <CategoryItem
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            selected={selectedCategory === category.value}
          >
            {category.label}
          </CategoryItem>
        ))}
      </Category>
    </Wrapper>
  );
};

export default CategoryBar;

const Wrapper = styled.div`
  display: flex;
  max-width: 1020px;
  margin: 28px auto 35px auto;
  height: fit-content;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    background-color: #ffffff;
    align-items: flex-end;
    height: 55px;
    padding: 0px 18px;
    margin: 5px 0;
  }
`;

const Category = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 7px;
  }
`;

const CategoryItem = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  font-weight: 500;
  padding: 9px 16px;
  border: none;
  border-radius: 20px;
  color: ${({ selected }) => (selected ? "#ffffff" : "#343434")};
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "#50bcff" : "rgb(245, 245, 247)"};

  @media (max-width: 640px) {
    font-size: 14.5px;
    padding: 8px 14px;
  }
`;
