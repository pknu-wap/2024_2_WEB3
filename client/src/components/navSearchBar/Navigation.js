import { CATEGORY } from "../../constants";
import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import "./Navigation.css";

const StyledLink = styled(Link)`
  color: ${({ textColor }) => textColor || "inherit"};
  text-decoration: none;
`;

function Navigation({ textColor }) {
  const location = useLocation(); // 현재 URL 경로 가져오기

  return (
    <nav>
      <div>
        <StyledLink
          to={`/list/${CATEGORY.FRUIT_WINE}`}
          className={`link link-fruit ${
            location.pathname === `/list/${CATEGORY.FRUIT_WINE}` ? "active" : ""
          }`}
          textColor={textColor}
        >
          과실주
        </StyledLink>
      </div>

      <div className="nav-line">|</div>

      <div>
        <StyledLink
          to={`/list/${CATEGORY.CHEONG_TAKJU}`}
          className={`link link-cheong ${
            location.pathname === `/list/${CATEGORY.CHEONG_TAKJU}`
              ? "active"
              : ""
          }`}
          textColor={textColor}
        >
          청주 / 탁주
        </StyledLink>
      </div>

      <div className="nav-line">|</div>

      <div>
        <StyledLink
          to={`/list/${CATEGORY.ALL}`}
          className={`link link-all ${
            location.pathname === `/list/${CATEGORY.ALL}` ? "active" : ""
          }`}
          textColor={textColor}
        >
          전체
        </StyledLink>
      </div>
    </nav>
  );
}

export default Navigation;
