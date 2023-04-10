import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  // timeout: 8000, // Set timeout to 8 seconds
});

export default axiosInstance;
