import { apiSlice } from "../apiSlice";
import { getTokenFromLocalStorage } from "../../localStorage";

export const kelolaSesiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKelolaSesi: builder.mutation({
      query: () => ({
        url: "/kelola-sesi",
        headers: {
          "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
        }
      })
    }),
    createKelolaSesi: builder.mutation({
      query: (post) => ({
        url: "/kelola-sesi",
        method: "POST",
        body: post,
        headers: {
          "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
        },
        formData:true  
      }),
    }),
  }),
});

export const {
  useGetKelolaSesiMutation,
  useCreateKelolaSesiMutation
} = kelolaSesiApi;
