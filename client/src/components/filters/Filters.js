import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./Filters.css";

const Filters = ({ onFilterChange, category }) => {
  const [alcoholLevel, setAlcoholLevel] = useState(""); // 도수 필터
  const [selectedRegions, setSelectedRegions] = useState([]); // 지역 필터
  const [open, setOpen] = useState(false); // 필터 열기, 닫기 상태
  const filterRef = useRef(null); // 필터 드롭다운의 DOM 참조
  const [searchParams, setSearchParams] = useSearchParams();

  // 도수 및 지역 옵션
  const alcoholOptions = ["0~5%", "5~10%", "10~15%", "15~50%"];
  const regionOptions = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  // 도수 필터 변경 핸들러 (중복 선택 X)
  const handleAlcoholChange = (option) => {
    setAlcoholLevel((prev) => (prev === option ? "" : option)); // 도수 선택
  };

  // 지역 필터 변경 핸들러 (중복 선택 O)
  const handleRegionChange = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((item) => item !== region)
        : [...prev, region]
    );
  };

  // 필터 초기화 핸들러 - 카테고리 바뀔 때도 필요(useEffect)
  const handleReset = () => {
    setAlcoholLevel(""); // 도수 필터 초기화
    setSelectedRegions([]); // 지역 필터 초기화
  };

  // category가 바뀔 때 handleReset 실행
  useEffect(() => {
    handleReset();
  }, [category]); // category가 변경될 때마다 실행

  // 필터 드롭다운 토글 핸들러
  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  // 페이지 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpen(false); // 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 필터 값 ListPage에 전달
  const handleComplete = () => {
    const transformedAlcoholLevel = alcoholLevel
      .replace("~", "-") // 물결을 대시로 변환
      .replace("%", ""); // % 제거
    const filters = {
      preferenceLevel: transformedAlcoholLevel, // 변환된 값
      areas: selectedRegions,
    };

    // 부모 컴포넌트(ListPage)로 필터 데이터 전달
    if (onFilterChange) {
      onFilterChange(filters);
    }
    setOpen(false); // 완료 시 드롭다운 닫기

    // 유효한 필터 값만 URL에 추가
    const updatedParams = {};
    if (filters.preferenceLevel) {
      updatedParams.preferenceLevel = filters.preferenceLevel;
    }
    if (filters.areas && filters.areas.length > 0) {
      updatedParams.areas = filters.areas.join(",");
    }

    setSearchParams({
      preferenceLevel: filters.preferenceLevel,
      areas: filters.areas.join(","),
    });
  };

  return (
    <div className={`Filters ${open ? "open" : ""}`} ref={filterRef}>
      <button className="filter-button" onClick={toggleDropdown}>
        <img src="/images/listPage/filter-img.png" alt="필터 버튼 아이콘" />
        필터
      </button>

      {/* 필터 드롭다운 */}
      <div className={`filter-dropdown ${open ? "show" : ""}`}>
        <div className="filter-section level">
          <h4>도수 선택</h4>
          <div className="checkbox-group">
            {alcoholOptions.map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={alcoholLevel === option}
                  onChange={() => handleAlcoholChange(option)}
                />
                <span className="custom-checkbox"></span>
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section region">
          <h4>지역 선택</h4>
          <div className="region-buttons">
            {regionOptions.map((region) => (
              <button
                key={region}
                className={`region-button ${
                  selectedRegions.includes(region) ? "active" : ""
                }`}
                onClick={() => handleRegionChange(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div className="select-buttons">
          <button onClick={handleReset} className="reset-button">
            초기화
          </button>
          <button onClick={handleComplete} className="complete-button">
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
