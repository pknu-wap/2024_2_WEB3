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

      idError: /^[a-zA-Z0-9]{2,10}@[a-zA-Z0-9]{2,20}$/.test(id)
        ? ""
        : "아이디는 2~10자의 영문자 또는 숫자와 '@' 기호, 그리고 뒤에 2~20자의 영문자 또는 숫자가 포함되어야 합니다.",

      pwError: pw.length >= 8 ? "" : "8자리 이상 입력해주세요.",
      pwCheckError: pw === pwCheck ? "" : "비밀번호와 일치하지 않습니다.",
      nicknameError:
        nickname.length >= 2 &&
        nickname.length <= 10 &&
        /^[가-힣a-zA-Z]+$/.test(nickname)
          ? ""
          : "닉네임은 2~10자이며 숫자를 제외한 한글과 영문 문자만 가능합니다.",
    };
    setErrors(newErrors);

    // 모든 입력이 올바를 때만 true 반환
    return (
      !newErrors.idError &&
      !newErrors.pwError &&
      !newErrors.pwCheckError &&
      !newErrors.nicknameError
    );
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
            {errors.nicknameError && (
              <div className="error-text">{errors.nicknameError}</div>
            )}

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
