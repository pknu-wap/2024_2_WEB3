import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

// 인증 토큰 추가 (요청 인터셉터 활용)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("refreshToken"); // 토큰을 로컬 스토리지에서 가져옴
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
const updateUserInfo = async (name) => {
  try {
    const response = await apiClient.post("api/mypage/updateInfo", {
      name,
    });
    if (response.data.code === "200") {
      return response.data.data;  // 수정된 정보 반환
    } else {
      throw new Error(response.data.message || "이름 수정 실패");
    }
  } catch (error) {
    console.error("이름 수정 중 에러 발생:", error.message);
    throw error;
  }
};

// 4. 선호 도수 설정
const updateUserPreference = async (preference) => {
  try {
    const response = await apiClient.post("api/mypage/updatePreference", {
      preference,
    });
    if (response.data.code === "200") {
      return response.data.data;  // 선호도수 설정 결과 반환
    } else {
      throw new Error(response.data.message || "선호도수 설정 실패");
    }
  } catch (error) {
    console.error("선호도수 설정 중 에러 발생:", error.message);
    throw error;
  }
};

// 5. 프로필 사진 수정
const updateUserProfileImage = async (formData) => {
  try {
    const response = await apiClient.post("api/mypage/updateProfileImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",  // 이미지 업로드를 위한 헤더 설정
      },
    });
    if (response.data.code === "200") {
      return response.data.data;  // 프로필 사진 수정 결과 반환
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
