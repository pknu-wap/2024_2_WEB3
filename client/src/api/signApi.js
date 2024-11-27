import apiClientToken from "./apiClientToken";

export const signupAPI = async (id, pw, nickname) => {
  const body = {
    userName: id,
    userId: nickname,
    password: pw,
  };
  try {
    const response = await apiClientToken.post(`/auth/signup`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signinAPI = async (id, pw) => {
  const body = {
    userName: id,
    password: pw,
  };
  try {
    const response = await apiClientToken.post(`/auth/login`, body);

    // 헤더에서 Access Token과 Refresh Token 가져오기
    const accessToken = response.headers["authorization"]; // Bearer {accessToken} 형태
    const refreshToken = response.headers["refresh"]; // {refreshToken}

    if (accessToken) {
      // Access Token 저장 (Bearer 제거 후 저장)
      localStorage.setItem("accessToken", accessToken.replace("Bearer ", ""));
    }

    if (refreshToken) {
      // Refresh Token 저장
      localStorage.setItem("refreshToken", refreshToken);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
