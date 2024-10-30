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
        <StyledLink to="/cheongtakju" className="link" textColor={textColor}>
          청주/탁주
        </StyledLink>
      </div>
      <div>
        <StyledLink to="/fruitWine" className="link" textColor={textColor}>
          과실주
        </StyledLink>
      </div>
    </nav>
  );
}

export default Navigation;
