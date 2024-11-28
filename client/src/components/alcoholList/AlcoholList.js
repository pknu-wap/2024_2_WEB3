import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import alcoholListApi from "../../api/alcoholListApi";
import "./AlcoholList.css";

const AlcoholList = ({ category, filters, searchQuery, onResetFilters }) => {
  const [alcoholList, setAlcoholList] = useState([]);
  const [filteredAlcoholList, setFilteredAlcoholList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pagesPerGroup = 5;

  // 데이터를 불러오는 함수
  const fetchData = async () => {
    if (!category) return;
    setIsLoading(true);
    try {
      const data = await alcoholListApi(category, page - 1, filters);
      setAlcoholList(data.content || []);
      setTotalPages(data.totalPages || 1);
      setFilteredAlcoholList(data.content || []); // 전체 데이터를 filteredAlcoholList에 저장
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 필터링 함수
  const handleSearch = () => {
    if (searchQuery) {
      // 검색어가 있을 때 해당하는 항목만 필터링
      const filtered = alcoholList.filter((item) =>
        item.drinkName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAlcoholList(filtered);
    } else {
      // 검색어가 없을 때는 전체 리스트를 보여줌
      setFilteredAlcoholList(alcoholList);
    }
  };

  // 페이지 변경 시 데이터 호출
  useEffect(() => {
    fetchData();
  }, [category, page, filters]);

  // 검색어가 변경될 때마다 검색 함수 호출
  useEffect(() => {
    handleSearch();
  }, [searchQuery, alcoholList]);

  const getPageNumbers = () => {
    const currentGroup = Math.ceil(page / pagesPerGroup);
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="AlcoholList">
      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* 전체 리스트 또는 검색 결과 */}
      <div className="alcohol-container">
        {filteredAlcoholList.length > 0 ? (
          filteredAlcoholList.map((item) => (
            <div key={item.postId} className="alcohol-item-wrap">
              <Link to={`/alcohol/${item.postId}`} className="link-img-tag">
                <img
                  src={item.postImage}
                  alt={item.drinkName}
                  className="alcohol-image"
                />
              </Link>
              <Link to={`/alcohol/${item.postId}`} className="link-name-tag">
                <div className="alcohol-name">{item.drinkName}</div>
              </Link>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          {"<"}
        </button>
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={page === pageNum ? "active-page" : ""}
          >
            {pageNum}
          </button>
        ))}
        <button
          className="page-btn"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default AlcoholList;
