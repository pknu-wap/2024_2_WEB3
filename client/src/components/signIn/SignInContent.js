import React, {useState} from "react";
import "./SignInContent.css";
import { Link,useNavigate } from "react-router-dom";
import { signinAPI } from "../../api/signApi";

const SignInContent = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const loginHandler = async () => {
    const loginStatus = await signinAPI(id, pw);
    if(loginStatus === 'login successful'){
      navigate("/");
    }
  }

  return (
    <div className="signin-background">
      <div className="signin-container">
        <div className="signin-left"></div>
        <div className="signin-right">
          <div className="signin-form">
            <input type="text" placeholder="아이디" className="signin-input" value={id} onChange={(e) => {setId(e.target.value)}} />
            <input
              type="password"
              placeholder="비밀번호"
              className="signin-input"
              value={pw}
              onChange={(e) => {setPw(e.target.value)}}
            />

            <div className="signin-signup-button">
              <Link to="/signUp">회원가입 </Link>
            </div>

            <div className="signin-button" onClick={() => {loginHandler()}}>로그인</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInContent;