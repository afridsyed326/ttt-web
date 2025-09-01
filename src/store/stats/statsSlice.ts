import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TGames = {
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
};

export type TGamePlayed = {
    _id: string;
    gameState: number[][];
    result: "LOSE" | "WIN" | "DRAW" | "ONGOING";
    userPlayer: number;
    createdAt: string;
};

type TPaginatedGameHistory = {
    list: TGamePlayed[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

interface StatsState {
    games: TGames;
    gameHistoryPaginated: TPaginatedGameHistory;
}

const initialState: StatsState = {
    games: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
    },
    gameHistoryPaginated: {
        list: [],
        total: 0,
        page: 0,
        limit: 0,
        totalPages: 0,
    },
};

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {
        setStats: (state, action: PayloadAction<TGames>) => {
            state.games = action.payload;
        },
        setPaginatedGameHistory: (
            state,
            action: PayloadAction<TPaginatedGameHistory>
        ) => {
            state.gameHistoryPaginated = action.payload;
        },
    },
});

export const { setStats, setPaginatedGameHistory } = statsSlice.actions;
export const SelectStatsState = (state: { stats: StatsState }) => state.stats;
export default statsSlice.reducer;
