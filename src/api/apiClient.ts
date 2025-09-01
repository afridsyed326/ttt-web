import { logout } from "@/utils/authUtils";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: any): any => response,
    (error: any) => {
        if (error.code === "ERR_NETWORK") {
            alert("Network Error. Please check your connection.");
            return;
        }

        if (error.response.status === 401) {
            logout();
            return;
        }

        if (error.response.status === 403) {
            logout();
            return;
        }

        // alert("An error occurred: " + error.response.data.message);

        return Promise.reject(error.response.data);
    }
);

export default axiosInstance;
