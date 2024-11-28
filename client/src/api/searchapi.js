import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에 설정된 baseURL
});

const searchapi = async (drinkName) => {
  try {
    const response = await apiClient.get(`/api/post/search?drinkName=${drinkName}`);

    // 성공 응답 처리
    if (response.data.code === "200") {
      console.log(response)
      return response.data.data.searchResult.content; // 검색 결과 반환
    } else {
      throw new Error(response.data.message || "전통주 검색 실패");
    }
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error.message);
    throw error; // 에러를 상위 호출로 전달
  }
};

export default searchapi;