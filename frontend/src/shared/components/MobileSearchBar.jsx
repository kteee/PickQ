import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Search from "@mui/icons-material/SearchRounded";
import Clear from "@mui/icons-material/Clear";
import Back from "@mui/icons-material/ArrowBackIosRounded";

const MobileSearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = (queryParams.get("keyword") || "").trim();
    setKeyword(keyword);
  }, [location.search]);

  const handleClear = () => setKeyword("");

  const handleBackIconClick = () => {
    setIsOpen(false);
    handleClear();
  };

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
    <>
      <MobileSearch>
        <Search sx={{ fontSize: "30px" }} onClick={() => setIsOpen(true)} />
      </MobileSearch>
      {isOpen && (
        <MobileSearchOverlay>
          <SearchInputWrapper>
            <BackIcon onClick={handleBackIconClick} />
            <SearchIcon onClick={handleSearch} />
            <SearchInput
              autoFocus
              type="search"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {keyword && <ClearIcon fontSize="small" onClick={handleClear} />}
          </SearchInputWrapper>
        </MobileSearchOverlay>
      )}
    </>
  );
};

export default MobileSearchBar;

const MobileSearch = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #424242;
    margin-top: 3px;
    margin-right: 10px;
  }
`;

const MobileSearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  background-color: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
  z-index: 999;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
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

const BackIcon = styled(Back)`
  color: #505050;
  margin-right: 8px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 45px;
  top: 50%;
  transform: translateY(-50%);
  color: #505050;
`;

const ClearIcon = styled(Clear)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
