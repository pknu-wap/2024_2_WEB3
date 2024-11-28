import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

// 인증 토큰 추가 (요청 인터셉터 활용)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken"); // 토큰을 로컬 스토리지에서 가져옴
    console.log(!!token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 인증 헤더 추가
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

// 1. 내 정보 확인
const getUserInfo = async () => {
  try {
    const response = await apiClient.get("api/mypage/info");
    if (response.data.code === "200") {
      console.log(response.data.data)
      return response.data.data;  // 내 정보 반환
    } else {
      throw new Error(response.data.message || "내 정보 조회 실패");
    }
  } catch (error) {
    console.error("내 정보 조회 중 에러 발생:", error.message);
    throw error;
  }
};

// 2. 북마크 확인
const getUserBookmarks = async () => {
  try {
    const response = await apiClient.get("api/mypage/bookmarks");
    if (response.data.code === "200") {
      return response.data.data;  // 북마크 반환
    } else {
      throw new Error(response.data.message || "북마크 조회 실패");
    }
  } catch (error) {
    console.error("북마크 조회 중 에러 발생:", error.message);
    throw error;
  }
};

// 3. 이름 수정
const updateUserInfo = async ({ token, userId, nickname }) => {
  try {
    const response = await apiClient.patch("api/mypage/updateInfo", {
      userId, nickname  // headers는 axios의 config로 처리
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
      if (response.data.code === "200") {
          console.log("닉네임 수정 성공:", response.data.data);
          return response.data.data;
      } else {
          throw new Error(response.data.message || "닉네임 수정 실패");
      }
  } catch (error) {
      console.error("닉네임 수정 중 오류 발생:", error.message);
      throw error;
  }
};

// 4. 선호 도수 설정
const updateUserPreference = async ({ token, preferenceLevel }) => {
  try {
    // PATCH 요청 보내기
    const response = await apiClient.patch("api/mypage/updatePreference", { 
      preferenceLevel  // preferenceLevel만 요청 본문에 포함
    }, {
      headers: { Authorization: `Bearer ${token}` }  // Authorization 헤더 포함
    });
   
    // 응답 코드가 200일 경우 성공 처리
    if (response.data.code === "200") {
      console.log("선호 도수 설정 성공:", response.data.data);
      return response.data.data;  // 수정된 데이터 반환
    } else {
      throw new Error(response.data.message || "선호 도수 설정 실패");
    }
  } catch (error) {
    console.error("선호 도수 수정 중 오류 발생:", error.message);
    throw error;  // 에러 재전파
  }
};



// 5. 프로필 사진 수정
const updateUserProfileImage = async (formData) => {
  try {
    const response = await apiClient.patch("api/mypage/updateProfileImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // CORS가 설정된 서버와 쿠키를 공유할 경우 필요
    });
    if (response.data.code === "200") {
      console.log("프로필 사진 수정 성공:", response.data.data);
      return response.data.data; // 성공적으로 수정된 데이터 반환
    } else {
      throw new Error(response.data.message || "프로필 사진 수정 실패");
    }
  } catch (error) {
    console.error("프로필 사진 수정 중 에러 발생:", error.message);
    throw error;
  }
};

// API 함수들을 export
export { getUserInfo, getUserBookmarks, updateUserInfo, updateUserPreference, updateUserProfileImage };
