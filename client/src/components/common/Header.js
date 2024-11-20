import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../navSearchBar/Navigation";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import logoutApi from "../../api/logoutApi.js";

const HeaderContainer = styled.header`
  color: ${({ $textColor }) => $textColor || "rgb(236, 232, 228)"};
`;

const StyledButton = styled.button`
  color: ${({ $textColor }) => $textColor || "rgb(0, 0, 0)"};
`;

const Header = ({ textColor: propTextColor, showNavigation = true }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <HeaderContainer className="Header" $textColor={textColor}>
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
        <Link to="/mypage">
          <img
            src="/images/mainpage/mypage-btn-img.png"
            alt="마이페이지"
            className="mypage-btn"
          />
        </Link>

        {/* 임시 로그아웃 버튼 */}
        <StyledButton
          className="logout-button"
          // $textColor={textColor}
          onClick={handleLogout}
        >
          로그아웃
        </StyledButton>

        {isLoggedIn ? (
          <>{/* 연동 후 로그아웃, 마이페이지 버튼 */}</>
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
