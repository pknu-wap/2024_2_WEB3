import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import alcoholListApi from "../../api/alcoholListApi";
import CustomModal from "../customModal/CustomModal";
import "./AlcoholList.css";

const AlcoholList = ({ category, filters, onResetFilters }) => {
  const [alcoholList, setAlcoholList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [imageLoadStates, setImageLoadStates] = useState({}); // 이미지 로드 상태
  const [loadedStates, setLoadedStates] = useState({}); // 이미지 유지
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지
  const pagesPerGroup = 5;

  // 데이터를 불러오는 함수
  const fetchData = useCallback(async () => {
    if (!category) return;
    setIsLoading(true); // 로딩 시작
    setIsModalOpen(false); // 모달 초기화
    try {
      const data = await alcoholListApi(category, page - 1, filters);
      setAlcoholList(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      const serverMessage =
        error.response?.data?.message || "알 수 없는 에러가 발생했습니다.";
      setModalMessage(serverMessage); // 모달 메시지 설정
      setIsModalOpen(true); // 모달 열기
      console.log("서버 에러 메세지:", error.response.data.message);
      // onResetFilters();
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  }, [category, page, filters]);

  // 페이지가 변경될 때 데이터 호출
  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  // 페이지 번호 초기화 (카테고리 변경 시)
  useEffect(() => {
    setPage(1); // 카테고리가 변경되면 페이지를 1로 초기화
  }, [category]);

  // 모달 "확인" 버튼 클릭 시 초기화
  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
    setSearchParams({}); // URL 초기화
    onResetFilters();
  };

  // 이미지 로드 성공 시 처리
  const handleImageLoad = (id) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [id]: true,
    }));
    setLoadedStates((prev) => ({
      ...prev,
      [id]: true, // 해당 이미지 로드 완료
    }));
  };

  // 이미지 로드 실패 시 처리
  const handleImageError = (id) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [id]: false, // 로드 실패로 상태 업데이트
    }));
  };

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
          {/* <div className="loading-spinner"></div> */}
          <img
            src="/images/Holjjak-logo.png"
            alt="로딩 로고"
            className="loading-logo"
          />
        </div>
      )}

      {/* 커스텀 모달 */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose} // 모달 닫기 동작
        message={modalMessage}
      />

      <div className="alcohol-container">
        {alcoholList.map((item) => (
          <div key={item.postId} className="alcohol-item-wrap">
            <Link to={`/alcohol/${item.postId}`} className="link-img-tag">
              {imageLoadStates[item.postId] !== false ? (
                <img
                  src={item.postImage}
                  alt={item.drinkName}
                  className="alcohol-image"
                  onLoad={() => handleImageLoad(item.postId)}
                  onError={() => handleImageError(item.postId)}
                />
              ) : (
                <div className="alcohol-image-empty">No Image</div>
              )}
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
