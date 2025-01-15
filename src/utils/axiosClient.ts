"use client";
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  withCredentials: true, // Automatically includes HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("cbpl-token")}`,
  },
});

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom: any) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(client(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh the token using HttpOnly cookie
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/login/refresh-token`,
          {},
          {
            withCredentials: true
          }
        );

        const newAccessToken = refreshResponse.data.token;

        if (newAccessToken) {
          // Save the new token
          localStorage.setItem("cbpl-token", newAccessToken);
          document.cookie = `cbpl-token=${newAccessToken}; path=/; max-age=86400;`;

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          return client(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError, null);
        localStorage.removeItem("cbpl-token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
