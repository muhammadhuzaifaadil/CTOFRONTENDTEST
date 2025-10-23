// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: 'http://localhost:3005', // Backend NestJS URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default apiClient;


import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";
import React from "react";

const apiClient = axios.create({
  baseURL: "https://cto-backend-test.onrender.com",
  headers: { "Content-Type": "application/json" },
});

// Add interceptor to attach token
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      const user =  localStorage.getItem("user")
      if (refreshToken) {
        try {
          const parsedUser = user ? JSON.parse(user) : null;
          const res = await axios.post("https://cto-backend-test.onrender.com/auth/refresh", {
            userId: parsedUser?.id,
            refreshToken,
          });

          const newAccessToken = res.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (err) {
          console.error("Refresh token failed", err);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
