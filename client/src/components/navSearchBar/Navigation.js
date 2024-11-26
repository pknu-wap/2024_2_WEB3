import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import "./Navigation.css";

const StyledLink = styled(Link)`
  color: ${({ textColor }) => textColor || "inherit"};
  text-decoration: none;
`;

function Navigation({ textColor }) {
  return (
    <nav>
      <div>
        <StyledLink
          to="/fruitWine"
          className="link-fruit"
          textColor={textColor}
        >
          과실주
        </StyledLink>
      </div>
      <div className="nav-line">|</div>
      <div>
        <StyledLink
          to="/cheongtakju"
          className="link-cheong"
          textColor={textColor}
        >
          청주/탁주
        </StyledLink>
      </div>
    </nav>
  );
}

export default Navigation;
