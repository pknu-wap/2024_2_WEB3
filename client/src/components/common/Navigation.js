import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <div>
        <Link to="/detail1">청탁주</Link>
      </div>
      <div>
        <Link to="/detail2">과실주</Link>
      </div>
    </nav>
  );
}

export default Navigation;
