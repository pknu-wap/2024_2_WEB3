import { useLocation } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import "./SearchBar.css";

// SearchBar 기본 스타일 정의
const StyledSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  input {
    font-family: "Pretendard", sans-serif;
    width: 50%;
    height: 55px;
    padding: 0 30px;
    font-size: 15px;
    border-radius: 50px;
    border: none;
    background-color: #d4cdc1;
    color: white;

    &::placeholder {
      color: white;
    }

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

const SearchBar = ({ className }) => {
  return (
    <StyledSearchBar className={className}>
      <input type="text" placeholder="원하는 술을 검색해 보세요!" />
    </StyledSearchBar>
  );
};

export default SearchBar;
