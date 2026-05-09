import API from "./api";

export const submitQRFeedbackAPI = async (data) => {
  const response = await API.post(`/feedback/submitFeedback`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const submitReportAPI = async (data) => {
  const response = await API.post(`/feedback/submitReport`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const getBranchFeedbackAPI = async () => {
  const response = await API.get(`/branch/getBranchFeedback`, {
    withCredentials: true,
  });

  return response.data;
};