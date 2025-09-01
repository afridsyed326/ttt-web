import { IUser } from "@/types/authTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: IUser; token: string }>
        ) => {
            localStorage.setItem("access_token", action.payload.token);
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("access_token");
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export const selectAuthState = (state: { auth: AuthState }) => state.auth;
export default authSlice.reducer;
