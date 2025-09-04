import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangePasswordProps } from "../../types/appTypes";

interface ChangePasswordState {
  user: ChangePasswordProps | null;
  success: boolean;
  error: string | null;
}

const initialState: ChangePasswordState = {
  user: null,
  success: false,
  error: null,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    changePasswordRequest: (state) => {
      state.success = false;
      state.error = null;
    },
    changePasswordSuccess: (state) => {
      state.success = true;
    },
    changePasswordFailure: (state, action: PayloadAction<string>) => {
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const {
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
