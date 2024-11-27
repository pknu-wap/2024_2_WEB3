import apiClient from "./apiClient";

const allListApi = async (page) => {
  try {
    const response = await apiClient.get(`api/post/all/${page}`); // baseURL 포함된 경로로 요청
    // console.log("서버 응답 메시지:", response.data.message); // 서버 응답 메시지 출력
    return response.data.data; // 필요한 데이터 반환
  } catch (error) {
    console.log("API 호출 중 에러 발생:", error.message);
    throw error;
  }
};

export default allListApi;
