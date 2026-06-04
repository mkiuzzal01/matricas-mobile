import { baseApi } from "@/redux/base/baseAPI";
import { logout, setUser } from "./auth.slice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.accessToken && data?.data?.user) {
            dispatch(
              setUser({
                user: data.data.user,
                token: data.data.accessToken,
              }),
            );
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyForgotOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-forgot-otp",
        method: "POST",
        body: data,
      }),
    }),

    resendOTP: builder.mutation({
      query: (data) => ({
        url: "/resend-otp",
        method: "POST",
        body: data,
      }),
    }),

    forgot: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useVerifyOtpMutation,
  useResendOTPMutation,
  useForgotMutation,
  useVerifyForgotOtpMutation,
  useResetPasswordMutation,
} = authApi;
