import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage
        .getItem("accessToken")
        ?.replace(/"/gi, "");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { status } = error.response;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post("/auth/refresh", { refreshToken });
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } else {
          console.error("Refresh token is missing.");
        }
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
      }
    } else {
      if (typeof window !== "undefined") {
        alert(`ERROR: ${error.response?.data?.message}`);
      } else {
        console.error(`ERROR: ${error.response?.data?.message}`);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
