import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  id: number;
  name: string;
  email: string;
  role: string;

  d_o_b?: string | null;
  gender?: string;
  phone?: string | null;
  avatar?: string | null;

  login_type?: string;
  choose_artist?: boolean;

  is_premium?: boolean;
  subscription_type?: string | null;

  stripe_id?: string | null;
  pm_type?: string | null;
  pm_last_four?: string | null;

  trial_ends_at?: string | null;
};

type AuthState = {
  user: TUser | null;
  token: string | null;
  tokenType: string;
};

type LoginPayload = {
  user: TUser;
  token: string;
  tokenType?: string;
};

const initialState: AuthState = {
  user: null,
  token: null,
  tokenType: "Bearer",
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.tokenType = action.payload.tokenType ?? "Bearer";
    },

    updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenType = "Bearer";
    },
  },
});

export const { setUser, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
