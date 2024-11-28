import apiClient from "./apiClient";

const logoutApi = async (refreshToken) => {
  try {
    const response = await apiClient.post(
      "/auth/logout",
      {}, // POST 요청의 body
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`, // 리프레시 토큰 전달
        },
      }
    );

    console.log("서버 응답 메시지:", response.data);
    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.log("로그아웃 API 에러:", error.name, "/", error.message);
    throw error;
  }
};

export default logoutApi;
