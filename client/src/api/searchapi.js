import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

const searchapi = async (drinkName, page) => {
  try {
    const response = await apiClient.get(`/api/post/search?drinkName=${drinkName}&page=${page}`, {
      params: {
        drinkName: encodeURIComponent(drinkName), // URL 인코딩된 drinkName 전달
        page,
      },
    });

    // 성공 응답을 반환, 데이터는 response.data.data.postDtos
    if (response.data.code === "200") {
      return response.data.data.postDtos; // 필요한 데이터 반환
    } else {
      throw new Error(response.data.message || "전통주 검색 실패");
    }
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error.message);
    throw error; // 에러를 호출한 곳에서 처리하도록 전달
  }
};

export default searchapi;
