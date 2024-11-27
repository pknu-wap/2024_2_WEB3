import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setError("검색어를 입력해주세요."); // 검색어가 비어있으면 에러 처리
      return;
    }
    setError(null);
    // 검색 결과 페이지로 이동, 쿼리 파라미터에 검색어 전달
    navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="원하는 술을 검색해 보세요!"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-input"
      />
      <img
        src="/images/search-icon.png"
        alt="search icon"
        onClick={handleSearch}
        className="search-icon"
      />
      {error && <p>{error}</p>}
    </div>
  );
}

export default SearchPage;
