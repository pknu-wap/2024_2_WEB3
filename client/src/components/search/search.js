import React, { useState, useEffect } from "react";
import searchapi from "../../api/searchapi";
import "./search.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);  // 페이지 상태 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API로부터 데이터를 검색해서 필터링하는 함수
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await searchapi(searchQuery, page);
      console.log(result); // 데이터가 제대로 오는지 확인
      setFilteredData(result);  // 검색 결과를 업데이트
    } catch (error) {
      setError("검색 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // searchQuery가 변경되거나 페이지가 바뀔 때마다 fetchData 호출
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchData();
    }
  }, [searchQuery, page]);

  const handleSearch = () => {
    setPage(1);  // 새 검색 시 페이지를 1로 리셋
    fetchData();
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="원하는 술을 검색해 보세요!"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <img 
        src="/images/search-icon.png" // 돋보기 아이콘 이미지 경로로 변경
        alt="search icon"
        onClick={handleSearch} // 돋보기 클릭 시 데이터 필터링 결과 출력
        className="search-icon"
      />
      {loading && <p>검색 중...</p>}
      {error && <p>{error}</p>}
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            <div>{item.drinkName}</div>
            <div>{item.preferenceLevel}</div>
            <div>{item.area}</div>
            <div>{item.type}</div>
            <img src={item.postImage} alt={item.drinkName} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
