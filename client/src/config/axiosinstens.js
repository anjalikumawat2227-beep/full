import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

// Add a request interceptor to include the access token in the headers
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        },
      );

      setAccessToken(res.data.data.accessToken);

      error.config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;

      return axios(error.config);
    }
    return Promise.reject(error);
  },
);

export default api;
