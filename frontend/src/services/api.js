import axios from "axios";

const API = axios.create({
  baseURL: "https://oceanfresh-backend.onrender.com",
  withCredentials: true,
});

export default API;
