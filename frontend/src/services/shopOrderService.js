import API from "./api";

export const createShopOrderAPI = async (data) => {
  const response = await API.post(`/branch/createShopOrder`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const getTodayShopOrdersAPI = async () => {
  const response = await API.get(`/branch/getTodayShopOrders`, {
    withCredentials: true,
  });

  return response.data;
};

export const getShopOrderHistory = async () => {
  const response = await API.get(`/branch/getShopOrderHistory`, {
    withCredentials: true,
  });

  return response.data;
};
