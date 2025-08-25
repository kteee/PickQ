import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="search" placeholder="검색어를 입d력하세요" />
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div``;

const SearchInput = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  width: 240px;
  padding: 8px 16px;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 20px;

  @media (max-width: 640px) {
  }
`;
