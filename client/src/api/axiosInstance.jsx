import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 5000, // Set timeout to 5 seconds
});

export default axiosInstance;