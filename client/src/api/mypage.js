import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

const getMypageInfo = async () => {
  try {
    // API 호출
    const response = await apiClient.get("/api/mypage/info");

    // 성공적으로 데이터를 받아왔다면
    if (response.data.code === "200") {
      return response.data.data;  // 필요한 데이터 반환
    } else {
      throw new Error(response.data.message || "마이페이지 정보를 불러오지 못했습니다.");
    }
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error.message);
    throw error;  // 에러를 호출한 곳에서 처리하도록 전달
  }
};

export default getMypageInfo;
