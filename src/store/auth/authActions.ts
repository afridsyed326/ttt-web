import axiosInstance from "@/api/apiClient";
import { IUser } from "@/types/authTypes";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "./authSlice";

export const useAuthActions = () => {
    const dispatch = useDispatch();

    const registerUser = async (data: IUser) => {
        return await axiosInstance
            .post("/auth/register", data)
            .then((res) => {
                const { user, token } = res.data.data;
                dispatch(loginSuccess({ user, token }));
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    };

    const login = async (data: Partial<IUser>) => {
        return await axiosInstance
            .post("/auth/login", data)
            .then((res) => {
                const { user, token } = res.data.data;
                dispatch(loginSuccess({ user, token }));
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    };

    const getProfile = async () => {
        return await axiosInstance
            .get("/auth/profile")
            .then((res) => {
                dispatch(setUser(res.data.data));
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    };

    return { registerUser, login, getProfile };
};
