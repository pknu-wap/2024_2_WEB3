import "./Header.css";
import logoutApi from "../../api/logoutApi.js";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  color: ${({ $textColor }) => $textColor || "rgb(236, 232, 228)"};
  background-color: ${(props) =>
    props.bgcolor || "transparent"}; // 기본값: 투명
`;

const StyledButton = styled.button`
  color: ${({ $textColor }) => $textColor || "rgb(0, 0, 0)"};
`;

const Header = ({ textColor: propTextColor, bgcolor }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    setIsLoading(true); // 로딩 시작
    const token = localStorage.getItem("refreshToken");
    try {
      const response = await logoutApi(token); // API 호출
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 경로에 따라 Header text 색상 설정
  const getTextColor = () => {
    switch (location.pathname) {
      case "/fruitWine":
        return "#574f4b";
      case "/cheongtakju":
        return "#574f4b";
      default:
        return "rgb(255, 255, 255)"; // 기본 색상
    }
  };

  // props로 받은 textColor가 없을 때만 getTextColor() 사용
  const textColor = propTextColor || getTextColor();

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer
      className="Header"
      $textColor={textColor}
      bgcolor={bgcolor}
    >
      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="logo-section">
        <Link to="/">
          <img src="/images/Holjjak-logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className="login-button-section">
        {isLoggedIn ? (
          <>
            <div className="dropdown-container" ref={dropdownRef}>
              <img
                src="/images/mainpage/mypage-btn-img.png"
                alt="마이페이지"
                className="user-btn"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />
              <ul className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                <li className="dropdown-menu-item">
                  <Link to="/mypage" className="mypage-link">
                    마이페이지
                  </Link>
                </li>
                <li className="dropdown-menu-item" onClick={handleLogout}>
                  로그아웃
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/signIn">
            <StyledButton
              className="sign-in-button"
              $textColor={"rgb(0, 0, 0)"}
            >
              로그인
            </StyledButton>
          </Link>
        )}
      </div>
    </HeaderContainer>
  );
};

export default Header;
