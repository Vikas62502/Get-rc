"use client";
import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true, // Automatically includes HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
});

let isRefreshing = false;
let failedQueue: any = [];

// Function to process the failed request queue
const processQueue = (error: any, token = null) => {
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
        // Add the request to the queue to be retried after refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: any) => {
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
        // Handle refresh token failure (e.g., logout user)
        console.error("Refresh token failed", refreshError);
        processQueue(refreshError, null);
        localStorage.removeItem("cbpl-token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
