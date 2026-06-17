import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { SliceName } from "./slice.name";
import { UserShortResponse } from "@constant/response/UserShortResponse";

interface AuthState {
  user?: UserShortResponse;
}

const initialState: AuthState = {
  user: undefined,
};

const accountSlice = createSlice({
  name: SliceName.Account,
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
    },
    loginSuccess: (state, action: PayloadAction<UserShortResponse>) => {
      state.user = action.payload;
    },
  },
});

export default accountSlice;
export const { logout, loginSuccess } = accountSlice.actions;
