import React, { useState } from "react";
import "./SignInContent.css";
import { Link, useNavigate } from "react-router-dom";
import { signinAPI } from "../../api/signApi";

const SignInContent = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const response = await signinAPI(id, pw); // 로그인 API 호출

      if (response === "login successful") {
        // 로그인 성공 시 홈 화면으로 이동
        navigate("/");
      } else {
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div
      className="signin-background"
      style={{
        backgroundImage: "url('/images/bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="loading-overlay">
          <img
            src="/images/Holjjak-logo.png"
            alt="leading-logo"
            className="loading-logo"
          />
        </div>
      )}

      <div
        className="signin-container"
        style={{
          backgroundImage: "url('/images/signbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="signin-left"></div>
        <div className="signin-right">
          <div className="signin-form">
            <input
              type="text"
              placeholder="아이디"
              className="signin-input"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="signin-input"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />

            <div className="signin-signup-button">
              <Link to="/signUp">회원가입 </Link>
            </div>

            <div
              className="signin-button"
              onClick={() => {
                loginHandler();
              }}
            >
              로그인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContent;
