import React, { useState, useRef, useEffect } from "react";
import "./mypage.css"; // CSS 파일을 불러옵니다
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Navigation from "../components/navSearchBar/Navigation";
import { useNavigate } from "react-router-dom";
import { getUserInfo, getUserBookmarks, updateUserInfo, updateUserPreference, updateUserProfileImage } from "../api/mypageapi"; // API 함수 import

function Mypage() {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [nicknameError, setNicknameError] = useState(""); // 닉네임 오류 메시지 상태
  const [preferenceScore, setPreferenceScore] = useState(""); // 선호도수 상태
  const [profileImage, setProfileImage] = useState("/images/uploads/profileImage1.png"); // 프로필 이미지 상태
  const fileInputRef = useRef(null); // 파일 입력을 위한 ref 생성
  const navigate = useNavigate();

  // 페이지 로딩 시 사용자 정보 가져오기
  const [userName, setUserName] = useState(""); // 로그인 ID(userName)
  
  // 이전 닉네임 상태 추가
  const [previousNickname, setPreviousNickname] = useState(""); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setNickname(userInfo.userDto.userId); // userId를 닉네임으로 사용
        setUserName(userInfo.userDto.userName); // userName은 필요 시 저장
        setPreferenceScore(userInfo.userDto.preferenceLevel ?? ""); // Nullish coalescing operator 사용
        setProfileImage(userInfo.userDto.profileImage || "default-avatar.png");
        setPreviousNickname(userInfo.userDto.userId); // 이전 닉네임 설정
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
    let nicknameUpdated = true;
    let preferenceUpdated = true;
  
    try {
      if (nickname !== "" && nickname !== previousNickname) {
        // 닉네임이 변경된 경우만 업데이트
        const updatedInfo = await updateUserInfo({
          userId: String(nickname),
        });
        setNickname(updatedInfo.userId);
        setPreviousNickname(updatedInfo.userId); // 이전 닉네임도 업데이트
        // 변경사항이 성공적으로 저장되었다는 메시지 표시
        console.log("모든 변경사항이 성공적으로 저장되었습니다.");
      } else {
        // 닉네임이 변경되지 않았더라도 메시지 표시
        console.log("모든 변경사항이 성공적으로 저장되었습니다.");
      }
    } catch (error) {
      nicknameUpdated = false;
      console.error("닉네임 수정 중 오류 발생:", error.message);
    }
    
    try {
      if (preferenceScore !== "") {
        // 선호도수 업데이트 시도
        const updatedPreference = await updateUserPreference({
          preferenceLevel: parseFloat(preferenceScore),
        });
        setPreferenceScore(updatedPreference.preferenceLevel); // 상태 업데이트
      }
    } catch (error) {
      preferenceUpdated = false;
      console.error("선호도 수정 중 오류 발생:", error.message);
    }
  
    if (nicknameUpdated && preferenceUpdated) {
      console.log("모든 변경사항이 성공적으로 저장되었습니다.");
      setIsEditing(false); // 편집 모드 해제
    } else {
      console.error("일부 수정에 실패했습니다. 다시 시도하세요.");
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
  
    // 입력값이 숫자인지 확인
    if (/^\d*$/.test(value)) {
      setPreferenceScore(value); // 상태 업데이트
    } else {
      console.error("숫자만 입력할 수 있습니다."); // 오류 메시지 추가
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
    navigate("/list/all");
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
  <div className="alcohol-grid">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="alcohol-item-container">
        <div className="alcohol-item empty"></div>
        <button className="add-btn" onClick={handleAddAlcoholClick}>+</button>
      </div>
    ))}
  </div>
</div>

          </div>
        </div>
      </div>
      <div className="main-footer">
        <img
          src="images/mainpage/main-footer.png"
          className="main-footer-img"
          alt="main-footer-img"
        />
      </div>
    </div>
  );
}

export default Mypage;
