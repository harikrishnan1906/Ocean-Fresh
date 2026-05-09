
import API from "./api";

export const getAdminDashboardStatsAPI = async () => {
  const response = await API.get("/admin/dashboardStats", {
    withCredentials: true,
  });

  return response.data;
};

export const registerBranch = async (data) => {
  const response = await API.post("/branch/register", data);
  return response.data;
};

export const getAllBranchesAPI = async () => {
  const response = await API.get("/admin/getAllBranches", {
    withCredentials: true,
  });
  return response.data;
};

export const updateBranchAPI = async (id, data) => {
  const response = await API.put(`/admin/updateBranch/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deactivateBranchAPI = async (id) => {
  const response = await API.put(
    `/admin/deactivateBranch/${id}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const activateBranchAPI = async (id) => {
  const response = await API.put(
    `/admin/activateBranch/${id}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getAllEmployeesAPI = async () => {
  const response = await API.get("/admin/getAllEmployees", {
    withCredentials: true,
  });
  return response.data;
};

// PRODUCTS API

export const getAllProductsAPI = async () => {
  const response = await API.get("/product/viewProduct");
  return response.data;
};

export const getProductByIdAPI = async (id) => {
  const response = await API.get(`/product/getProduct/${id}`);
  return response.data;
};

export const addProductAPI = async (data) => {
  const response = await API.post("/product/addProduct", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const editProductAPI = async (id, data) => {
  const response = await API.put(`/product/editProduct/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await API.delete(`/product/deleteProduct/${id}`);
  return response.data;
};

export const getDeletedProductsAPI = async () => {
  const response = await API.get("/product/viewDeletedProduct");
  return response.data;
};

export const restoreProductAPI = async (id) => {
  const response = await API.put(`/product/restoreProduct/${id}`);
  return response.data;
};

export const getAllUsersAPI = async () => {
  const response = await API.get("/admin/getAllUsers", {
    withCredentials: true,
  });
  return response.data;
};

export const getAllReportsAPI = async () => {
  const response = await API.get("/admin/getAllReports", {
    withCredentials: true,
  });
  return response.data;
};

export const getAllFeedbackAPI = async () => {
  const response = await API.get("/admin/getAllFeedback", {
    withCredentials: true,
  });
  return response.data;
};

export const getOnlineOrdersAPI = async () => {
  const response = await API.get("/admin/getOnlineOrders", {
    withCredentials: true,
  });
  return response.data;
};

export const getShopOrdersAPI = async () => {
  const response = await API.get("/admin/getShopOrders", {
    withCredentials: true,
  });
  return response.data;
};