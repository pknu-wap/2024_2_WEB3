import apiClient from "./apiClient";

export const signupAPI = async (id, pw, nickname) => {
  const body = {
    userName: id,
    userId: nickname,
    password: pw,
  };
  try {
    const response = await apiClient.post(`/auth/signup`, body);

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
    const response = await apiClient.post(`/auth/login`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
