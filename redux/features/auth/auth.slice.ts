import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  id: number;
  email: string;
  role: string;
  name?: string;
  avatar?: string | null;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
  tokenType?: string | null;
  expiresAt?: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  tokenType: null,
  expiresAt: null,
};

type LoginPayload = {
  user: TUser;
  token: string;
  tokenType?: string;
  expiresAt?: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;

      state.token = action.payload.token;

      state.tokenType = action.payload.tokenType ?? "Bearer";

      state.expiresAt = action.payload.expiresAt ?? null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenType = null;
      state.expiresAt = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
