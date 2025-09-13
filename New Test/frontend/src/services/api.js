import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  get: (url) => axios.get(`${BASE_URL}${url}`, { headers: getAuthHeaders() }),
  post: (url, data) => axios.post(`${BASE_URL}${url}`, data, { headers: getAuthHeaders() }),
  put: (url, data) => axios.put(`${BASE_URL}${url}`, data, { headers: getAuthHeaders() }),
  delete: (url) => axios.delete(`${BASE_URL}${url}`, { headers: getAuthHeaders() }),
};
