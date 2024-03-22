import axios from "axios";
import Cookies from 'js-cookie';

const apiNational = axios.create({
  baseURL: "https://national.cliprz.org/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiNational.interceptors.request.use(
  (config: any) => {
    const code = Cookies.get("code");
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (code) {
      config.headers["code"] = code
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export default apiNational;