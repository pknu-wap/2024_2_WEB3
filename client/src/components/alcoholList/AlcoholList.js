import "./AlcoholList.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Filters from "../filters/Filters";

const AlcoholList = ({ fetchApi, category }) => {
  const [alcoholList, setAlcoholList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pagesPerGroup = 5;
  const [loadedStates, setLoadedStates] = useState({});

  // 데이터를 불러오는 함수
  const fetchData = useCallback(
    async (pageNum) => {
      if (!fetchApi) return; // fetchApi가 없으면 실행하지 않음
      try {
        const data = await fetchApi(pageNum);
        setAlcoholList(data.content || []);
        setTotalPages(data.totalPages - 1 || 1);
      } catch (error) {
        console.error("데이터 로딩 중 오류:", error.message);
      }
    },
    [fetchApi]
  );

  // 페이지가 변경될 때만 데이터 호출
  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  // 현재 그룹의 페이지 번호 계산
  const getPageNumbers = () => {
    const currentGroup = Math.ceil(page / pagesPerGroup); // 현재 페이지 그룹 계산
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    // 해당 그룹의 페이지 번호 배열 반환
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // 페이지 번호 초기화 (카테고리 변경 시)
  useEffect(() => {
    setPage(1); // 카테고리가 변경되면 페이지를 1로 초기화
  }, [category]);

  const handleSaveToLocalStorage = (item) => {
    try {
      localStorage.setItem("selectedAlcohol", JSON.stringify(item));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  };

  const handleImageLoad = (id) => {
    setLoadedStates((prev) => ({
      ...prev,
      [id]: true, // 해당 이미지 로드 완료
    }));
  };

  return (
    <div className="AlcoholList">
      <Filters />
      <div className="alcohol-container">
        {alcoholList.map((item) => (
          <div
            key={item.postId}
            className="alcohol-item-wrap"
            onClick={() => handleSaveToLocalStorage(item)}
          >
            <Link to={`/alcohol/${item.postId}`} className="link-img-tag">
              <img
                src={item.postImage}
                alt={item.drinkName}
                className={`alcohol-image ${
                  loadedStates[item.postId] ? "loaded" : "loading"
                }`}
                onLoad={() => handleImageLoad(item.postId)} // 로드 완료 시 상태 업데이트
                onError={(e) => {
                  e.target.style.display = "none"; // 로드 실패 시 이미지 숨김
                }}
              />
            </Link>
            <Link to={`/alcohol/${item.postId}`} className="link-name-tag">
              <div className="alcohol-name">{item.drinkName}</div>
            </Link>
          </div>
        ))}
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
