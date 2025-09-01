import axiosInstance from "@/api/apiClient";
import { useDispatch } from "react-redux";
import { setStats, setPaginatedGameHistory } from "./statsSlice";

export const useStatsActions = () => {
    const dispatch = useDispatch();

    const getStats = async () => {
        return await axiosInstance
            .get("/stats")
            .then((res) => {
                dispatch(setStats(res.data.data));
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    };

    const getGameHistory = async (params: any) => {
        return await axiosInstance
            .get("/stats/history", {
                params,
            })
            .then((res) => {
                dispatch(setPaginatedGameHistory(res.data.data));
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    };

    return { getStats, getGameHistory };
};
