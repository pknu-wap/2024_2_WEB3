import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({}) => {
  return (
    <footer className="Footer">
      <div className="footer-wrap">
        <div className="footer-links">
          <Link to="/JamWa" className="footer-link">
            개인정보처리방침
          </Link>
          <Link to="/beaGoPa" className="footer-link">
            이용약관
          </Link>
          <Link to="/SulDdangGeo" className="footer-link">
            고객센터
          </Link>
        </div>

        <div className="footer-bottom">
          <img src="/images/logo-white.png" className="footer-logo" />

          <div className="footer-text">
            <p>부산광역시 남구 용소로 45, 부경대학교</p>
            <p>Copyright © 2024 PNKU WAP WEP TEAM 3</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
