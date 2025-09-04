import axios, { AxiosInstance } from "axios";
import { persistor, store } from "../../redux/store";
import { logout } from "../../redux/reducers/authSlice";

const getToken = () => {
    const state = store.getState();
    return state.auth.token;
};

const axiosClient: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach the auth token
axiosClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response?.data;
    },
    (error) => {
        const { response } = error;

        if (response && response.status === 401) {
            persistor.purge();
            store.dispatch(logout());
        }

        return Promise.reject(error);
    }
);
export default axiosClient;
