import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlcoholList from "../components/alcoholList/AlcoholList";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Navigation from "../components/navSearchBar/Navigation";
import Filters from "../components/filters/Filters";
import SearchBar from "../components/navSearchBar/SearchBar";
import "../styles/ListPage.css";

const ListPage = () => {
  const { category } = useParams(); // URL에서 category 가져오기
  const [filters, setFilters] = useState({ preferenceLevel: "", areas: [] });
  const [currentCategory, setCurrentCategory] = useState(category);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 필터 초기화 함수 (useCallback으로 메모이제이션)
  const resetFilters = useCallback(() => {
    setFilters({ preferenceLevel: "", areas: [] });
  }, []);

  useEffect(() => {
    // 카테고리 변경 시 필터 초기화
    if (category !== currentCategory) {
      resetFilters(); // 필터 초기화
      setCurrentCategory(category); // 현재 카테고리 업데이트
    }
  }, [category, currentCategory, resetFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query); // 검색어를 상태로 저장
  };

  return (
    <div className="ListPage">
      <MemoizedHeader bgColor="#F2EEE7" />

      <SearchBar />
      {/* SearchBar 컴포넌트 추가 */}
      {/* <div className="search-container">
        <input
          type="text"
          placeholder="원하는 술을 검색해 보세요!"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div> */}

      <MemoizedNavigation />
      <Filters onFilterChange={setFilters} category={category} />

      {/* AlcoholList에서 검색어를 필터링하여 전달 */}
      <AlcoholList
        category={category}
        filters={filters}
        searchQuery={searchQuery} // 검색어를 전달
        onResetFilters={resetFilters}
      />

      <MemoizedFooter className="footer1" />
      <div className="list-footer">
        <img
          src="/images/listPage/list-footer.png"
          className="list-footer-img"
          alt="list-footer-img"
        />
      </div>
    </div>
  );
};

// Memoize components to prevent unnecessary re-renders
const MemoizedHeader = React.memo(Header);
const MemoizedFooter = React.memo(Footer);
const MemoizedNavigation = React.memo(Navigation);

export default ListPage;
