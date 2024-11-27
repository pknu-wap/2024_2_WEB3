import React, { useState } from "react";
import AlcoholList from "../components/alcoholList/AlcoholList"; // AlcoholList 컴포넌트를 import

const SearchResult = ({ category, filters }) => {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리

  // 검색어 변경 시 호출되는 함수
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
