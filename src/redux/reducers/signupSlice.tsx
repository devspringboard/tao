import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupProps } from "../../types/appTypes";

const initialState: {
  user: SignupProps | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupUser: (
      state,
      action: PayloadAction<{ user: SignupProps; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { signupUser, setToken } = signupSlice.actions;
export default signupSlice.reducer;
