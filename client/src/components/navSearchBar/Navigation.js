import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <div>
        <Link to="/cheongtakju">청주/탁주</Link>
      </div>
      <div>
        <Link to="/fruitWine">과실주</Link>
      </div>
    </nav>
  );
}

export default Navigation;
