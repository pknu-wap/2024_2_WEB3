import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ onFilterChange }) => {
  const [selectedAlcohol, setSelectedAlcohol] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [open, setOpen] = useState(false); // State to manage dropdown visibility

  const alcoholOptions = ["0~5%", "5~10%", "10~15%", "15~20%"];
  const regionOptions = [
    "서울",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
  ];

  const handleAlcoholChange = (option) => {
    setSelectedAlcohol((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleRegionChange = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((item) => item !== region)
        : [...prev, region]
    );
  };

  const handleReset = () => {
    setSelectedAlcohol([]);
    setSelectedRegions([]);
  };

  const handleComplete = () => {
    console.log("Selected Alcohol Filters:", selectedAlcohol);
    console.log("Selected Regions:", selectedRegions);
    if (onFilterChange) {
      onFilterChange({ alcohol: selectedAlcohol, regions: selectedRegions });
    }
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={`Filters ${open ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleDropdown}>
        <img src="/images/listPage/filter-img.png" alt="버튼 아이콘" />
        {open ? "닫기" : "필터 열기"}
      </button>
      <div className={`filter-dropdown ${open ? "show" : ""}`}>
        <div className="filter-section">
          <h3>도수 필터</h3>
          {alcoholOptions.map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedAlcohol.includes(option)}
                onChange={() => handleAlcoholChange(option)}
              />
              <span className="custom-checkbox"></span>
              {option}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3>지역 필터</h3>
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

        <div className="filter-buttons">
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
