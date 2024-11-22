import "./AlcoholList.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Filters from "../filters/Filters";

// AlcoholList.js
const AlcoholList = ({ fetchApi }) => {
  const [alcoholList, setAlcoholList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 페이지 데이터를 불러오는 함수
  const fetchData = useCallback(
    async (pageNum) => {
      try {
        const data = await fetchApi(pageNum);
        setAlcoholList(data.content);
        setTotalPages(data.totalPages - 1);
      } catch (error) {
        console.log("데이터 로딩 중 오류:", error.message);
      }
    },
    [fetchApi]
  );

  // 페이지가 변경될 때만 데이터 호출
  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={page === i ? "active-page" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleSaveToLocalStorage = (item) => {
    try {
      localStorage.setItem("selectedAlcohol", JSON.stringify(item));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  };

  return (
    <div className="AlcoholList">
      {/* <Filters className="Filters" /> */}
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
                className="alcohol-image"
              />
            </Link>
            <Link to={`/alcohol/${item.postId}`} className="link-name-tag">
              <div className="alcohol-name">{item.drinkName}</div>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          {"<"}
        </button>
        {renderPageNumbers()}
        <button
          className="page-btn"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default AlcoholList;
