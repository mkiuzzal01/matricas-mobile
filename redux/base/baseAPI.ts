import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";
import { logout, setUser } from "../features/auth/auth.slice";
import { tagTypes } from "./tagTypes";

let isRefreshing = false;

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Accept", "application/json");

    return headers;
  },
});

const baseQueryWithRefreshToken: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);

  // If not unauthorized → return directly
  if (result?.error?.status !== 401) {
    return result;
  }

  // Prevent multiple refresh calls
  if (!isRefreshing) {
    isRefreshing = true;

    try {
      const refreshResponse = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const refreshData = await refreshResponse.json();

      if (refreshResponse.ok && refreshData?.data?.accessToken) {
        const state = api.getState() as RootState;
        const currentUser = state.auth.user;

        if (currentUser) {
          api.dispatch(
            setUser({
              user: currentUser,
              token: refreshData.data.accessToken,
              tokenType: refreshData.data.tokenType ?? "Bearer",
              expiresAt: refreshData.data.expiresAt ?? null,
            }),
          );
        }

        // retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      api.dispatch(logout());
    } finally {
      isRefreshing = false;
    }
  } else {
    // Wait for refresh to finish
    await new Promise((resolve) => setTimeout(resolve, 500));

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes,
  endpoints: () => ({}),
});
