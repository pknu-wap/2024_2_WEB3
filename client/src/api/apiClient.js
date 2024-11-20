import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE, // .env에서 설정한 baseURL 사용
});

export default apiClient;
