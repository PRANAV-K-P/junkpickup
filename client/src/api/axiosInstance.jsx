import axios from "axios";
import {baseUrl} from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  // timeout: 8000, // Set timeout to 8 seconds
});

export default axiosInstance;
