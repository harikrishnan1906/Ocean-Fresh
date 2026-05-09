import API from "./api";

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logout");
};

export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await API.get("/auth/profile", {
    withCredentials: true,
  });
  return response;
};

export const forgotPasswordAPI = async (data) => {
  const response = await API.post("/auth/forgotPassword", data);
  return response.data;
};

export const changePasswordAPI = async (data) => {
  const response = await API.put("/auth/changePassword", data, {
    withCredentials: true,
  });
  return response.data;
};