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
  height: 65px;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;

  @media (max-width: 640px) {
    background-color: #ffffff;
    align-items: flex-end;
    height: 55px;
    padding: 2px 18px;
  }
`;

const Category = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 7px;
  }
`;

const CategoryItem = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14.5px;
  font-weight: 500;
  padding: 8px 15px;
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
