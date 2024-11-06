import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

const cheongTakjuListApi = async (page) => {
  try {
    const response = await apiClient.get(`api/post/cheongtakju/${page}`); // baseURL 포함된 경로로 요청
    // console.log("서버 응답 메시지:", response.data.message); // 서버 응답 메시지 출력
    return response.data.data; // 필요한 데이터 반환
  } catch (error) {
    console.log("API 호출 중 에러 발생:", error.message);
    throw error;
  }
};

export default cheongTakjuListApi;
