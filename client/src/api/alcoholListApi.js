import apiClient from "./apiClient";

// 동적 API 호출 함수
const alcoholListApi = async (category, page, filters = {}) => {
  const { preferenceLevel, areas } = filters;

  // 쿼리 파라미터 동적 생성
  const queryParams = new URLSearchParams();

  if (preferenceLevel && preferenceLevel.trim() !== "") {
    queryParams.append("preferenceLevel", preferenceLevel);
  }
  if (areas && Array.isArray(areas) && areas.length > 0) {
    queryParams.append("areas", areas.join(","));
  }

  // 최종 URL 생성
  const url = `api/post/${category}/${page}${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  try {
    const response = await apiClient.get(url);
    // console.log("서버 응답 메시지:", response.data.message);
    return response.data.data; // 서버에서 필요한 데이터 반환
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // console.log(`서버 에러 메시지: ${error.response.data.message}`);
    } else {
      console.log(`API 요청 실패: ${error.message}`);
      alert(`API 요청 실패: ${error.message}`);
    }
    throw error;
  }
};

export default alcoholListApi;
