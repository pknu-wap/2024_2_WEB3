import React from "react";
import "./SignInContent.css";
import { Link } from "react-router-dom";

const SignInContent = () => {
  return (
    <div className="signin-background">
      <div className="signin-container">
        <div className="signin-left"></div>
        <div className="signin-right">
          <div className="signin-form">
            <input type="text" placeholder="아이디" className="signin-input" />
            <input
              type="password"
              placeholder="비밀번호"
              className="signin-input"
            />

            <div className="signin-signup-button">
              <Link to="/signUp">회원가입 </Link>
            </div>

            <div className="signin-button">로그인</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContent;