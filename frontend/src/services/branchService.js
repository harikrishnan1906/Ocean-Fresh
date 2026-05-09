import API from "./api";

export const getInventoryProducts = async (data) => {
  const response = await API.get(
    "/branch/getInventory",

    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const updateInventoryAPI = async (data) => {
  const response = await API.post("/branch/updateInventory", data, {
    withCredentials: true,
  });

  return response.data;
};

export const getBranchDetailsAPI = async () => {
  const response = await API.get("/branch/getBranchDetails", {
    withCredentials: true,
  });

  return response.data;
};

export const getBranchOrdersAPI = async () => {
  const response = await API.get(`/branch/getBranchOrders`, {
    withCredentials: true,
  });

  return response.data;
};

export const updateOrderStatusAPI = async (id, status) => {
  const response = await API.put(
    `/branch/updateOrderStatus/${id}`,
    { status },
    { withCredentials: true },
  );

  return response.data;
};