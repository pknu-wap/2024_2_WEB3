import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../navSearchBar/Navigation";
import SearchBar from "../navSearchBar/SearchBar";
import Mypage from "../../pages/mypage";

const Header = ({}) => {
  return (
    <header className="Header">
      <div className="logo-section">
        <Link to="/">
          <img src="/images/Holjjak-logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className="nav-section">
        <Navigation />
      </div>

      <div className="search-section">
        {/* <SearchBar /> */}

        <Link to="/mypage">
          <button className="mypage-button">마이페이지</button>{" "}
        </Link>
      </div>

      <div className="login-button-section">
        <Link to="/signIn">
          <button className="sign-in-button">로그인</button>
        </Link>
        <Link to="/signUp">
          <button className="sign-up-button">회원가입</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
