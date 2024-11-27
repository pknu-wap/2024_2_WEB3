import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

// 인증 토큰 추가 (요청 인터셉터 활용)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 토큰을 로컬 스토리지에서 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 인증 헤더 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 1. 내 정보 확인
const getUserInfo = async () => {
  try {
    const response = await apiClient.get("api/mypage/info");
    if (response.data.code === "200") {
      // console.log("Fetched User Info:", response.data.message);
      return response.data.data; // 내 정보 반환
    } else {
      throw new Error(response.data.message || "내 정보 조회 실패");
    }
  } catch (error) {
    // 서버가 반환한 에러 메시지를 출력
    if (error.response && error.response.data) {
      console.error("서버 에러 메시지:", error.response.data.message);
    } else {
      console.error("알 수 없는 에러:", error.message);
    }
    throw error;
  }
};

// 2. 북마크 확인
const getUserBookmarks = async () => {
  try {
    const response = await apiClient.get("api/mypage/bookmarks");
    if (response.data.code === "200") {
      // console.log("Fetched User bmk:", response.data.message);
      // console.log("bmk data:", response.data.data);
      return response.data.data; // 북마크 반환
    } else {
      throw new Error(response.data.message || "북마크 조회 실패");
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.log("북마크 조회 중 에러 발생:", error.response.data.message);
    } else {
      console.log("북마크 조회 중 알 수 없는 오류:", error.message);
    }
    throw error;
  }
};

// 3. 이름 수정
const updateUserInfo = async (userId) => {
  try {
    const response = await apiClient.patch("api/mypage/updateInfo", {
      userId,
    });
    if (response.data.code === "200") {
      console.log("서버 메세지:", response.data.message);
      // console.log("수정된 데이터:", response.data.data);
      return response.data.data; // 수정된 정보 반환
    } else {
      throw new Error(response.data.message || "이름 수정 실패");
    }
  } catch (error) {
    console.log("이름 수정 중 에러 발생:", error.response.data.message);
    throw error;
  }
};

// 4. 선호 도수 설정
const updateUserPreference = async (preferenceLevel) => {
  try {
    const response = await apiClient.patch("api/mypage/updatePreference", {
      preferenceLevel,
    });
    if (response.data.code === "200") {
      console.log("서버 메세지:", response.data.message);
      // console.log("데이터:", response.data.data);
      return response.data.data;
    } else {
      throw new Error(response.data.message || "선호도수 설정 실패");
    }
  } catch (error) {
    console.log("선호도수 설정 중 에러 발생:", error.response.data.message);
    throw error;
  }
};

// 5. 프로필 사진 수정
const updateUserProfileImage = async (formData) => {
  try {
    const response = await apiClient.patch(
      "api/mypage/updateProfileImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // 이미지 업로드를 위한 헤더 설정
        },
      }
    );
    if (response.data.code === "200") {
      return response.data.data; // 프로필 사진 수정 결과 반환
    } else {
      throw new Error(response.data.message || "프로필 사진 수정 실패");
    }
  } catch (error) {
    console.error("프로필 사진 수정 중 에러 발생:", error.message);
    throw error;
  }
};

// API 함수들을 export
export {
  getUserInfo,
  getUserBookmarks,
  updateUserInfo,
  updateUserPreference,
  updateUserProfileImage,
};
