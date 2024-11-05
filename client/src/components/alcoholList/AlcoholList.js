import "./AlcoholList.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// AlcoholList.js
const AlcoholList = ({ fetchApi }) => {
  const [alcoholList, setAlcoholList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApi(page); // 현재 페이지에 맞는 데이터 호출
        setAlcoholList(data.content); // 현재 페이지의 컨텐츠 설정
        setTotalPages(data.totalPages); // 전체 페이지 수 설정
      } catch (error) {
        console.log("데이터 로딩 중 오류:", error.message);
      }
    };
    fetchData();
  }, [page]);

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

  return (
    <div className="AlcoholList">
      <div className="alcohol-container">
        {alcoholList.map((item, index) => (
          <div key={index} className="alcohol-item-wrap">
            <Link to={`/api/post/info/${item.postId}`} className="link-img-tag">
              <img src={item.postImage} className="alcohol-image" />
            </Link>

            <Link
              to={`/api/post/info/${item.postId}`}
              className="link-name-tag"
            >
              <div className="alcohol-name">{item.drinkName}</div>
            </Link>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          {"<"}
        </button>
        {renderPageNumbers()}
        <button
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
