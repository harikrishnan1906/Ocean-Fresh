import API from "./api";

export const addProduct = async (data) => {
  const response = await API.post("/product/addProduct", data);
  return response;
};

export const viewProduct = async () => {
  const response = await API.get("/product/viewProduct");
  return response;
};

export const getProduct = async (id) => {
  const response = await API.get(`/product/getProduct/${id}`);
  return response;
};

export const editProduct = async (data, id) => {
  const response = await API.put(`/product/editProduct/${id}`, data);
  return response;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/product/deleteProduct/${id}`);
  return response;
};

export const getDeletedProduct = async (req, res) => {
  const response = await API.get("/product/viewDeletedProduct");
  return response;
};

export const restoreProduct = async (id) => {
  const response = await API.put(`/product/restoreProduct/${id}`);
  return response;
};
