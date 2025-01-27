"use client";
import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:8080',
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
        // Call the refresh token API
        const response = await client.post(`api/login/refresh-token`);
        const newAccessToken = response.data.token;

        document.cookie = `cbpl-token=${response.data.token}; path=/; max-age=86400;`;

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process all queued requests
        processQueue(null, newAccessToken);

        return client(originalRequest);
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
