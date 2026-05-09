import API from "./api";

export const addEmployee = async (data) => {
  const response = await API.post("/employee/addEmployee", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

export const viewEmployees = async (data) => {
  const response = await API.get("/employee/viewEmployees", {
    withCredentials: true,
  });
  return response.data;
};

export const getEmployee = async (id) => {
  const response = await API.get(`/employee/getEmployee/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const editEmployee = async (id, data) => {
  const response = await API.put(`/employee/editEmployee/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const deactivateEmployee = async (id) => {
  const response = await API.put(
    `/employee/deactivateEmployee/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const activateEmployee = async (id) => {
  const response = await API.put(
    `/employee/activateEmployee/${id}`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};
