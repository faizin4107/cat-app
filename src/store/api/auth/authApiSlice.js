import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      }),
    }),
    checkEmail: builder.mutation({
      query: (data) => ({
        url: "/check-email",
        method: "POST",
        body: data
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data
      }),
    }),
    logout: builder.mutation({
      query: ({data, accessToken}) => ({
        url: '/logout',
        method: "POST",
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${accessToken}`,
        },
      }),
    })
  }),
});
export const { useRegisterUserMutation, useLoginMutation, useCheckEmailMutation, useForgotPasswordMutation, useLogoutMutation } = authApi;
