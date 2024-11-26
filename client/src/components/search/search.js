import React, { useState } from "react";
import searchapi from "../../api/searchapi";
import "./search.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  // page 상태 추가

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await searchapi(searchQuery);  // page를 포함한 API 호출
      console.log(result); // API 응답 확인
      if (result && Array.isArray(result)) {
        setFilteredData(result);  // 정상적인 데이터만 업데이트
      } else {
        setFilteredData([]); // 잘못된 데이터일 경우 빈 배열로 처리
      }
    } catch (error) {
      setError("검색 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setError("검색어를 입력해주세요."); // 검색어가 비어있으면 에러 처리
      return;
    }
    setPage(1); // 검색할 때마다 페이지를 1로 초기화
    fetchData();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터 키 입력 시 검색 실행
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
      {loading && <p>검색 중...</p>}
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <li key={index}>
              <div>{item.drinkName}</div>
              <div>{item.preferenceLevel}</div>
              <div>{item.area}</div>
              <div>{item.type}</div>
              <img src={item.postImage} alt={item.drinkName} />
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default SearchPage;
