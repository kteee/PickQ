import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Search from "@mui/icons-material/SearchRounded";
import Clear from "@mui/icons-material/Clear";

const PCSearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = (queryParams.get("keyword") || "").trim();
    setKeyword(keyword);
  }, [location.search]);

  const handleClear = () => setKeyword("");

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    navigate(`/?keyword=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <SearchBar>
      <SearchIcon onClick={handleSearch} />
      <SearchInput
        type="search"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {keyword && <ClearIcon fontSize="small" onClick={handleClear} />}
    </SearchBar>
  );
};

export default PCSearchBar;

const SearchBar = styled.div`
  position: relative;
  width: 230px;
  margin-right: 38px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
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
  cursor: pointer;
`;

const ClearIcon = styled(Clear)`
  position: absolute;
  right: -1px;
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
