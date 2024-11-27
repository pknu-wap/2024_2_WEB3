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

// 응답 인터셉터: 토큰 갱신 로직 추가
apiClientToken.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 전달
  async (error) => {
    const originalRequest = error.config;

    // Access Token 만료 시 Refresh Token으로 갱신
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post("/auth/refresh", {
            refreshToken,
          });

          const newAccessToken = data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiClientToken(originalRequest); // 원래 요청 재전송
        } catch (refreshError) {
          console.log("Token refresh failed:", refreshError);
          // 필요 시 로그아웃 처리
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClientToken;
