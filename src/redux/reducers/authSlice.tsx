import { createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../../types/appTypes";

const initialState: {
    user: UserProps | null;
    token: string | null;
} = {
    user: null,
    token: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { setUser, setToken, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
