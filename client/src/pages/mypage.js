import React, { useState, useRef } from "react";
import "./mypage.css"; // CSS 파일을 불러옵니다
import Header from "../components/common/Header";

function Mypage() {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [nickname, setNickname] = useState("Nickname"); // 닉네임 상태
  const [preferenceScore, setPreferenceScore] = useState(""); // 선호도수 상태
  const [profileImage, setProfileImage] = useState("default-avatar.png"); // 프로필 이미지 상태

  const fileInputRef = useRef(null); // 파일 입력을 위한 ref 생성

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드로 변경
  };

  const handleSaveClick = () => {
    setIsEditing(false); // 편집 모드 해제
  };

  const handlePreferenceChange = (e) => {
    setPreferenceScore(e.target.value); // 선호도수 상태 업데이트
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value); // 닉네임 상태 업데이트
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택된 파일
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // 파일을 읽고 이미지로 설정
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  const handleDeleteClick = () => {
    setProfileImage("default-avatar.png"); // 기본 프로필 이미지로 설정
  };

  const openFileDialog = () => {
    fileInputRef.current.click(); // 파일 입력 클릭
  };

  return (
    <div className="profile-page">
      {/* <Header className="mypage-header" /> */}
      <div className="profile-left">
        <div className="profile-picture">
          <img src={profileImage} alt="" className="profile-img" />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                value={nickname}
                onChange={handleNicknameChange}
                className="nickname-input"
              />
              <div className="button-container">
                <button className="edit-btn" onClick={openFileDialog}>
                  사진 변경
                </button>
                <button className="edit-btn" onClick={handleDeleteClick}>
                  삭제
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                ref={fileInputRef}
                style={{ display: "none" }} // 숨김
              />
              <button className="save-btn" onClick={handleSaveClick}>
                완료
              </button>
            </>
          ) : (
            <>
              <h2>{nickname}</h2>
              <button className="edit-btn" onClick={handleEditClick}>
                프로필 수정
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-right">
        <div className="preference-section">
          <h3>내 취향</h3>
          <div className="preference-details">
            <div className="preference-score">
              <span>선호 도수</span>
              <input
                type="text"
                value={preferenceScore}
                onChange={handlePreferenceChange}
                placeholder=""
                className="preference-input"
                disabled={!isEditing} // 편집 모드가 아닐 때 비활성화
              />
              <span>%</span>
            </div>
            <div className="favorite-alcohol">
              <h4>담은 술</h4>
              <div className="alcohol-grid">
                <div className="alcohol-item empty"></div>
                <div className="alcohol-item empty"></div>
                <div className="alcohol-item empty"></div>
                <div className="alcohol-item empty"></div>
                {/* 두 번째 줄 */}
                <div className="alcohol-item empty"></div>
                <div className="alcohol-item empty"></div>
                <div className="alcohol-item empty"></div>
                <div className="alcohol-item add-more">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
