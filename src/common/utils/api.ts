import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import { loading } from "./loading";
import { notify } from "./notify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authentication token if available
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Show loading for non-GET requests
    if (config.method !== "get") {
      loading(true, "Processing...");
    }

    return config;
  },
  (error: AxiosError) => {
    loading(false);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    loading(false);
    return response;
  },
  (error: AxiosError) => {
    loading(false);

    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const message =
        (error.response.data as any)?.message || "An error occurred";

      switch (status) {
        case 401:
          notify("error", "Unauthorized", "Please log in again");
          // Clear token and redirect to login
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
          break;
        case 403:
          notify(
            "error",
            "Forbidden",
            "You do not have permission to perform this action"
          );
          break;
        case 404:
          notify("error", "Not Found", "The requested resource was not found");
          break;
        case 500:
          notify(
            "error",
            "Server Error",
            "Internal server error. Please try again later."
          );
          break;
        default:
          notify("error", "Error", message);
      }
    } else if (error.request) {
      // Request was made but no response received
      notify("error", "Network Error", "Unable to connect to the server");
    } else {
      // Something else happened
      notify("error", "Error", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
