import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
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
  (error) => {
    if (typeof window !== "undefined") {
      alert(`ERROR: ${error.response?.data?.message}`);
    } else {
      console.error(`ERROR: ${error.response?.data?.message}`);
    }
    return Promise.reject(error);
  }
);

export default instance;
