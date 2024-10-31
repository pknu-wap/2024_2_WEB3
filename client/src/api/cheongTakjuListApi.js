import apiClient from "./apiClient";

export default async function cheongTakjuListApi(page = 1) {
  try {
    const response = await apiClient.get(`/post/cheongtakju/${page}`); // 경로로 GET 요청
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버에서 반환하는 에러 응답
      const { code, message } = error.response.data;
      console.log(`에러 코드: ${code}, 메시지: ${message}`);
    } else {
      // 서버와 연결되지 않음
      console.log("서버 응답이 없습니다.");
    }
  }
}
