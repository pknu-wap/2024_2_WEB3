import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({}) => {
  return (
    <header className="Header">
      <div className="logo-section">
        <Link to="/">
          <img src="/Holjjak_logo.png" alt="Logo" />
        </Link>
      </div>

      <div className="login-button-section">
        <button className="sign-in-button">로그인</button>
        <button className="sign-up-button">회원가입</button>
      </div>
    </header>
  );
};

export default Header;
