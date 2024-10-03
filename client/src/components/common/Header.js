import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = ({}) => {
  return (
    <header className="Header">
      <div>
        {/* 로고: 클릭 시 메인 페이지로 이동 */}
        <Link to="/">
          <img src="/path-to-logo" alt="Logo" />
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <Navigation />

      {/* 로그인 상태에 따라 다르게 표시 */}
      <div>
        <button>로그인</button>
        <button>회원가입</button>
      </div>
      <div>
        <div>
          <Link to="/mypage">user</Link>님 환영해요!
        </div>
      </div>
    </header>
  );
};

export default Header;
