import axios from "axios";

// Axios 인스턴스를 생성 & 기본 설정을 지정
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // API의 기본 URL (환경 변수 사용)
  headers: {
    "Content-Type": "application/json", // 기본 Content-Type 헤더
  },
});

// 요청 인터셉터를 설정하여 각 요청마다 인증 토큰을 자동으로 추가합니다.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 인증 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더에 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 인터셉터 에러 처리
  }
);

export default apiClient;
