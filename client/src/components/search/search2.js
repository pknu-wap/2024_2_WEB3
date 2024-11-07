import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  
  // 데이터 가져오기
  useEffect(() => {
    axios.get("https://example.com/api/drinks")  // 실제 API URL로 대체
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
