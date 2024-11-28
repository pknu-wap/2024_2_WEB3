import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlcoholList from "../components/alcoholList/AlcoholList"; // AlcoholList 컴포넌트를 import

const SearchResult = ({ category, filters }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리

  // 쿼리 파라미터에서 검색어 가져오기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    
    if (query) {
      setSearchQuery(query); // 검색어 상태 업데이트
    }
  }, [location.search]);

  // 검색어 변경 시 호출되는 함수 (추가 입력을 처리할 경우)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-result-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="검색..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* 검색어를 AlcoholList 컴포넌트에 전달 */}
      <AlcoholList
        category={category}
        filters={filters}
        searchQuery={searchQuery} // 검색어를 props로 전달
      />
    </div>
  );
};

export default SearchResult;