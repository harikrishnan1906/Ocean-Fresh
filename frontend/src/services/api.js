import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5069/api",
  withCredentials: true,
});

export default API;
    