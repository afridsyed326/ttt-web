import axiosInstance from "@/api/apiClient";
// import { useDispatch } from "react-redux";

export const usePlayActions = () => {
    // const dispatch = useDispatch();

    const startNewGame = async (userPlayer: number) => {
        return await axiosInstance
            .post("/play", { userPlayer })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    };

    const makeAMove = async (gameId: string, gameState: number[][]) => {
        return await axiosInstance
            .post(`/play/${gameId}/move`, { gameState })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err;
            });
    };

    return { startNewGame, makeAMove };
};
