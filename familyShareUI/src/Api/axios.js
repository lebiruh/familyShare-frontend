import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://amazon-backend-16pi.onrender.com"
  baseURL: "http://localhost:5000"
});

export {axiosInstance};