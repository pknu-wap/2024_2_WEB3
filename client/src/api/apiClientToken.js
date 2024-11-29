import axios from "axios";

// Axios 인스턴스 생성
const apiClientToken = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

apiClientToken.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`; // Access Token 추가
  }
  return config;
});

// 응답 인터셉터: Access Token 만료 시 로그인 리디렉션 처리
apiClientToken.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 전달
  async (error) => {
    if (error.response.status === 401) {
      console.warn("Access Token 만료 또는 인증 실패");

      alert("세션이 만료되었습니다. 다시 로그인해주세요.");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/signIn";
    }

    return Promise.reject(error);
  }
);

export default apiClientToken;
