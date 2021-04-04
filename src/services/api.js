import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use(async (config) => {
  config.headers["Content-type"] = `application/json`;

  const token = localStorage.getItem("_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("_token");
      window.location.href = "/login";
      const requestConfig = error.config;
      return axios(requestConfig);
    }

    return Promise.reject(error);
  }
);

export default api;
