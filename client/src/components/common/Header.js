import "./Header.css";
import Navigation from "../navSearchBar/Navigation";
import logoutApi from "../../api/logoutApi.js";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderContainer = styled.header`
  color: ${({ $textColor }) => $textColor || "rgb(236, 232, 228)"};
  background-color: ${(props) =>
    props.bgcolor || "transparent"}; // 기본값: 투명
`;

const StyledButton = styled.button`
  color: ${({ $textColor }) => $textColor || "rgb(0, 0, 0)"};
`;

const Header = ({
  textColor: propTextColor,
  showNavigation = true,
  bgcolor,
}) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const token = localStorage.getItem("refreshToken");
    console.log(!!token ? "refreshToken 있음" : "refreshToken 없음"); // 확인용 상태 메시지 출력
    try {
      const response = await logoutApi(token); // API 호출
      console.log(response.message); // "Successfully log out" 출력
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
    } catch (error) {
      alert("로그아웃에 실패했습니다.");
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
      <div className="logo-section">
        <Link to="/">
          <img src="/images/Holjjak-logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>

      {showNavigation && (
        <div className="nav-section">
          <Navigation $textColor={textColor} />
        </div>
      )}

      <div className="login-button-section">
        {/* 임시 마이페이지 버튼 */}
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

        {isLoggedIn ? (
          <>{/* 로그아웃, 마이페이지 */}</>
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
