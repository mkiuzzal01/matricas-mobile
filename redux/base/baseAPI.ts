/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  type DefinitionType,
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/auth.slice";
import { tagTypes } from "./tagTypes";

// Base query with authorization header from Redux store
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
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
        // Get current user from state
        const currentUser = (api.getState() as RootState).auth.user;

        // Update Redux store with new token
        if (currentUser) {
          api.dispatch(
            setUser({
              user: {
                id: currentUser?.id || 0,
                email: currentUser?.email || "",
                role: currentUser?.role || "",
                name: currentUser?.name || "",
                avatar: currentUser?.avatar || null,
              },
              token: refreshData.data.accessToken,
              tokenType: refreshData.data.tokenType || "Bearer",
              expiresAt: refreshData.data.expiresAt,
            }),
          );
        }

        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed - logout user
        api.dispatch(logout());
      }
    } catch (error) {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypes,
  endpoints: () => ({}),
});
