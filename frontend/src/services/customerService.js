import API from "./api";

export const editCustomerProfile = async (id, data) => {
  const response = await API.put(`/customer/editCustomer/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const viewBranchesForCustoerAPI = async () => {
  const response = await API.get("/customer/viewBranches", {
    withCredentials: true,
  });

  return response.data;
};

export const viewProductsAPI = async (id) => {
  const response = await API.get(`/customer/viewProducts/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const addToFavoriteAPI = async (id) => {
  const response = await API.post(`/customer/addToFavorite/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getFavoriteProductsAPI = async () => {
  const response = await API.get("/customer/getFavoriteProducts", {
    withCredentials: true,
  });

  return response.data;
};

export const removeFromFavoriteAPI = async (id) => {
  const response = await API.put(`/customer/removeFromFavorite/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getOrderDetailsAPI = async (productId, branchId) => {
  const response = await API.get(
    `/customer/getOrderDetails/${productId}/${branchId}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const placeOrderAPI = async (orderData) => {
  const response = await API.post(`/customer/placeOrder`, orderData, {
    withCredentials: true,
  });

  return response.data;
};

export const getMyOrdersAPI = async () => {
  const response = await API.get(`/customer/getMyOrders`, {
    withCredentials: true,
  });

  return response.data;
};

export const getDetailsForFeedbackAPI = async (branchId, employeeId) => {
  const response = await API.get(
    `/customer/getQRCodeDetails/${branchId}/${employeeId}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const cancelMyOrderAPI = async (orderId) => {
  const response = await API.put(
    `/customer/cancelMyOrder/${orderId}`,
    {},
    {
      withCredentials: true,
    },
  );
  return response.data;
};
