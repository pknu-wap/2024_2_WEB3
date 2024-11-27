import React, { useState, useRef, useEffect } from "react";
import "./mypage.css"; // CSS 파일을 불러옵니다
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import { getUserInfo, getUserBookmarks, updateUserInfo, updateUserPreference, updateUserProfileImage } from "../api/mypageapi"; // API 함수 import

function Mypage() {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [nickname, setNickname] = useState("Nickname"); // 닉네임 상태
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 오류 메시지 상태
  const [preferenceScore, setPreferenceScore] = useState(""); // 선호도수 상태
  const [profileImage, setProfileImage] = useState("default-avatar.png"); // 프로필 이미지 상태
  const fileInputRef = useRef(null); // 파일 입력을 위한 ref 생성
  const navigate = useNavigate();

  // 페이지 로딩 시 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setNickname(userInfo.nickname);
        setPreferenceScore(userInfo.preference || "");
        setProfileImage(userInfo.profileImage || "default-avatar.png");
      } catch (error) {
        console.error("사용자 정보 조회 중 오류 발생:", error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드로 변경
    setNicknameError(""); // 편집 모드 들어갈 때 오류 메시지 초기화
  };

  const handleSaveClick = async () => {
    setIsEditing(false); // 편집 모드 해제

    try {
      // 닉네임 수정
      if (nickname !== "") {
        await updateUserInfo(nickname);
      }
      // 선호 도수 설정
      if (preferenceScore !== "") {
        await updateUserPreference(preferenceScore);
      }
      // 프로필 사진 수정
      if (profileImage !== "default-avatar.png") {
        await updateUserProfileImage(profileImage);
      }
    } catch (error) {
      console.error("수정 중 오류 발생:", error.message);
    }
  };

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    if (newNickname.length <= 10) {
      setNickname(newNickname); // 닉네임 상태 업데이트
      setNicknameError(""); // 오류 메시지 초기화
    } else {
      setNicknameError("글자수가 초과되었습니다"); // 글자수가 초과된 경우 오류 메시지 설정
    }
  };

  const handlePreferenceChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPreferenceScore(value); // 숫자만 입력된 경우 상태 업데이트
    }
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

  const handleNicknameFocus = () => {
    setNickname(""); // 입력란 클릭 시 빈 칸으로 설정
  };

  const handleAddAlcoholClick = () => {
    navigate("/cheongtakju");
  };

  return (
    <div className="profile-page">
      <Header textColor="#574f4b" />
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
                onFocus={handleNicknameFocus} // 클릭 시 빈 칸으로 설정
                className="nickname-input"
              />
              {nicknameError && <p className="nickname-error">{nicknameError}</p>}
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
                maxLength="2"
              />
              <span className="percentage">%</span>
            </div>

            <div className="favorite-alcohol">
              <h4>담은 술</h4>
              <button className="add-btn" onClick={handleAddAlcoholClick}>
                추가
              </button>
            </div>
            <div className="alcohol-grid">
              <div className="alcohol-item empty"></div>
              <div className="alcohol-item empty"></div>
              <div className="alcohol-item empty"></div>
              <div className="alcohol-item empty"></div>
              {/* 두 번째 줄 */}
              <div className="alcohol-item empty"></div>
              <div className="alcohol-item empty"></div>
              <div className="alcohol-item empty"></div>
              <div className="alcohol-item empty"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
