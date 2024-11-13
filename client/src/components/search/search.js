import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // 데이터 가져오기
  useEffect(() => {
    axios
      .get("/data/drinks.json")  // JSON 파일의 경로로 대체
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = () => {
    const results = data.filter(item =>
      item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(results);
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
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
