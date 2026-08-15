import axios from "axios";

const API_URL = "https://campus-connect-1-t5v9.onrender.com";

const axiosInstace = axios.create({
    baseURL: API_URL,
    timeout: 100000,
    withCredentials: true
});

export default axiosInstace
