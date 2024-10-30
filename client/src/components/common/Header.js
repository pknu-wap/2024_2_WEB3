import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../navSearchBar/Navigation";
import SearchBar from "../navSearchBar/SearchBar";
import styled from "styled-components";

const HeaderContainer = styled.header`
  color: ${({ textColor }) => textColor || "rgb(236, 232, 228)"};
`;

const StyledButton = styled.button`
  color: ${({ textColor }) => textColor || "rgb(236, 232, 228)"};
`;

const Header = ({ textColor: propTextColor }) => {
  const location = useLocation();

  // 경로에 따라 Header text 색상 설정
  const getTextColor = () => {
    switch (location.pathname) {
      case "/fruitWine":
        return "#574f4b";
      case "/cheongtakju":
        return "#574f4b";
      default:
        return "rgb(236, 232, 228)"; // 기본 색상
    }
  };

  // props로 받은 textColor가 없을 때만 getTextColor() 사용
  const textColor = propTextColor || getTextColor();

  return (
    <HeaderContainer className="Header" textColor={textColor}>
      <div className="logo-section">
        <Link to="/">
          <img src="/images/Holjjak-logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className="nav-section">
        <Navigation textColor={textColor} />
      </div>

      <div className="search-section">
        {/* <SearchBar /> */}

        <Link to="/mypage">
          <button className="mypage-button">마이페이지</button>
        </Link>
      </div>

      <div className="login-button-section">
        <Link to="/signIn">
          <StyledButton className="sign-in-button" textColor={textColor}>
            로그인
          </StyledButton>
        </Link>
        <Link to="/signUp">
          <StyledButton className="sign-up-button" textColor={textColor}>
            회원가입
          </StyledButton>
        </Link>
      </div>
    </HeaderContainer>
  );
};

export default Header;
