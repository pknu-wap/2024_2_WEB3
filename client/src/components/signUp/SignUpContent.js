import React, { useState } from "react";
import "./SignUpContent.css";
import Header from "../common/Header";
import { Link, useNavigate } from "react-router-dom";
import { signupAPI } from "../../api/signApi";

const SignUpContent = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    idError: "",
    pwError: "",
    pwCheckError: "",
  });

  const validateForm = () => {
    const newErrors = {
      // idError: id.includes("@") ? "" : "@ 가 포함되어야 합니다.",
      pwError: pw.length >= 8 ? "" : "8자리 이상 입력해주세요.",
      pwCheckError: pw === pwCheck ? "" : "비밀번호와 일치하지 않습니다.",
    };
    setErrors(newErrors);

    // 모든 입력이 올바를 때만 true 반환
    return !newErrors.idError && !newErrors.pwError && !newErrors.pwCheckError;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const result = await signupAPI(id, pw, nickname);
      if (result === "User successfully created") {
        navigate("/signIn");
      }
    }
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
    if (errors.idError) {
      setErrors((prevErrors) => ({ ...prevErrors, idError: "" }));
    }
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
    if (errors.pwError) {
      setErrors((prevErrors) => ({ ...prevErrors, pwError: "" }));
    }
  };

  const handlePwCheckChange = (e) => {
    setPwCheck(e.target.value);
    if (errors.pwCheckError) {
      setErrors((prevErrors) => ({ ...prevErrors, pwCheckError: "" }));
    }
  };

  return (
    <div
      className="signup-background"
      style={{
        backgroundImage: "url('/images/bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header textColor="#574f4b" />
      <div
        className="signup-container"
        style={{
          backgroundImage: "url('/images/signbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="signup-left"></div>
        <div className="signup-right">
          <div className="signup-form">
            <input
              type="text"
              placeholder="아이디"
              className="signup-input"
              onChange={handleIdChange}
            />
            {errors.idError && (
              <div className="error-text">{errors.idError}</div>
            )}

            <input
              type="password"
              placeholder="비밀번호"
              className="signup-input"
              onChange={handlePwChange}
            />
            {errors.pwError && (
              <div className="error-text">{errors.pwError}</div>
            )}

            <input
              type="password"
              placeholder="비밀번호 확인"
              className="signup-input"
              onChange={handlePwCheckChange}
            />
            {errors.pwCheckError && (
              <div className="error-text">{errors.pwCheckError}</div>
            )}

            <input
              placeholder="닉네임"
              className="signup-input"
              onChange={(e) => setNickname(e.target.value)}
            />

            <div className="signup-button" onClick={handleSubmit}>
              회원가입 완료
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpContent;
