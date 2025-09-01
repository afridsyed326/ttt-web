import { TGameData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayState {
    currentGame: TGameData;
}

const initialState: PlayState = {
    currentGame: {
        gameState: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ],
        userPlayer: -1,
        id: "",
        gameOver: false,
    },
};

const playSlice = createSlice({
    name: "play",
    initialState,
    reducers: {
        setCurrentGame: (state, action: PayloadAction<TGameData>) => {
            state.currentGame = action.payload;
        },
        resetGame: (state) => {
            state.currentGame = {
                gameState: [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
                userPlayer: -1,
                id: "",
                gameOver: false,
            };
        },
    },
});

export const { setCurrentGame, resetGame } = playSlice.actions;
export const selectPlayState = (state: { play: PlayState }) => state.play;
export default playSlice.reducer;
