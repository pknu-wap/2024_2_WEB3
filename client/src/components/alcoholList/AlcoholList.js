import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import alcoholListApi from "../../api/alcoholListApi";
import "./AlcoholList.css";

const AlcoholList = ({ category, filters, searchQuery, onResetFilters }) => {
  const [alcoholList, setAlcoholList] = useState([]); // 전체 데이터
  const [filteredAlcoholList, setFilteredAlcoholList] = useState([]); // 필터링된 데이터
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10; // 한 페이지에 표시할 아이템 수

  const getPageNumbers = () => {
    const pagesPerGroup = 5; // 그룹당 표시할 페이지 수
    const totalPages = getTotalPages();
    const currentGroup = Math.ceil(page / pagesPerGroup); // 현재 페이지 그룹
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // 전체 데이터 가져오기
  const fetchAllData = async () => {
    if (!category) return;
    setIsLoading(true);

    try {
      let allData = [];
      let currentPage = 0;
      let totalPages = 1;

      // 모든 페이지 데이터 가져오기
      do {
        const data = await alcoholListApi(category, currentPage, filters);
        allData = [...allData, ...data.content];
        totalPages = data.totalPages;
        currentPage++;
      } while (currentPage < totalPages);

      setAlcoholList(allData); // 전체 데이터를 저장
      setFilteredAlcoholList(allData); // 초기에는 전체 데이터를 필터링 데이터로 설정
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 필터링
  const handleSearch = () => {
    if (searchQuery) {
      const filtered = alcoholList.filter((item) =>
        item.drinkName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAlcoholList(filtered);
      setPage(1); // 검색 결과가 바뀌면 첫 페이지로 이동
    } else {
      setFilteredAlcoholList(alcoholList);
    }
  };

  // 페이지네이션 데이터 가져오기
  const getPaginatedData = () => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredAlcoholList.slice(startIndex, startIndex + itemsPerPage);
  };

  // 페이지 번호 계산
  const getTotalPages = () => Math.ceil(filteredAlcoholList.length / itemsPerPage);

  // 데이터 로드 및 검색 처리
  useEffect(() => {
    fetchAllData();
  }, [category, filters]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, alcoholList]);

  return (
    <div className="AlcoholList">
      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="loading-overlay">
          <img
            src="/images/Holjjak-logo.png"
            alt="로딩 로고"
            className="loading-logo"
          />
        </div>
      )}

      {/* 검색 결과 또는 전체 리스트 */}
      <div className="alcohol-container">
        {getPaginatedData().length > 0 ? (
          getPaginatedData().map((item) => (
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

  {/* 이전 페이지 버튼 */}
  <button
    className="page-btn"
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
  >
    {"<"}
  </button>

  {/* 페이지 번호 */}
  {getPageNumbers().map((pageNum) => (
    <button
      key={pageNum}
      onClick={() => setPage(pageNum)}
      className={page === pageNum ? "active-page" : ""}
    >
      {pageNum}
    </button>
  ))}

  {/* 다음 페이지 버튼 */}
  <button
    className="page-btn"
    onClick={() => setPage((prev) => Math.min(prev + 1, getTotalPages()))}
    disabled={page === getTotalPages()}
  >
    {">"}
  </button>

</div>

    </div>
  );
};

export default AlcoholList;