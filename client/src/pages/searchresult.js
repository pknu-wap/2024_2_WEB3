import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import searchapi from "../api/searchapi";
import Header from "../components/common/Header";
import SearchPage from "../components/search/search";
import Footer from "../components/common/Footer";


function ResultsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await searchapi(searchQuery);
        setFilteredData(result || []);
      } catch (err) {
        setError("검색 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div>
    <Header />
    <SearchPage />
    <div className="results-container">
      <h2>검색 결과: {searchQuery}</h2>
      {loading && <p>검색 중...</p>}
      {error && <p>{error}</p>}
      <ul>
        {filteredData.length > 0 ? (
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
      <Footer />
    </div>
    </div>
  );
}

export default ResultsPage;
