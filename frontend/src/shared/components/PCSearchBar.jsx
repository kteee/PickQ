import { useState } from "react";
import styled from "styled-components";
import Search from "@mui/icons-material/SearchRounded";
import Clear from "@mui/icons-material/Clear";

const PCSearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const handleClear = () => setKeyword("");

  return (
    <SearchBar>
      <SearchIcon />
      <SearchInput
        type="search"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {keyword && <ClearIcon fontSize="small" onClick={handleClear} />}
    </SearchBar>
  );
};

export default PCSearchBar;

const SearchBar = styled.div`
  position: relative;
  width: 230px;
  margin-right: 44px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  padding: 8px 16px 8px 42px;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 20px;
  outline: none;

  &:focus {
    border-color: #26a6f0e3;
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #505050;
  pointer-events: none;
`;

const ClearIcon = styled(Clear)`
  position: absolute;
  right: -17px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #aaa;

  &:hover {
    color: #333;
  }
`;
