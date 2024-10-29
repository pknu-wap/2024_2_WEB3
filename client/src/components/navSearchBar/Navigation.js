import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <div>
        <Link to="/cheongtakju" className="link">
          청주/탁주
        </Link>
      </div>
      <div>
        <Link to="/fruitWine" className="link">
          과실주
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
