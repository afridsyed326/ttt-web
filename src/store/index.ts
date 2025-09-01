import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import playReducer from "./play/playSlice";
import statsReducer from "./stats/statsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        play: playReducer,
        stats: statsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// #6d2c70
