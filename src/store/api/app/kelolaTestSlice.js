import { apiSlice } from "../apiSlice";
import { getTokenFromLocalStorage } from "../../localStorage";

export const kelolaTestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKelolaTest: builder.mutation({
      query: () => ({
        url: "/kelola-test",
        headers: {
          "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
        }
      })
    }),
    createKelolaTest: builder.mutation({
      query: (post) => ({
        url: "/kelola-test",
        method: "POST",
        body: post,
        headers: {
          "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
        },
        formData:true  
      }),
    }),
    editKelolaTest: builder.mutation({
      query: (post) => ({
        url: `/kelola-test/${post.id}?_method=PUT`,
        method: "POST",
        body: post.post,
        headers: {
          "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
        },
        formData: true  
      }),
    }),
    deleteKelolaTest: builder.mutation({
      query: (id) => ({
        url: `/kelola-test/${id}/_method=DELETE`,
        method: "POST",
        "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
      }),
    }),
  }),
});

export const {
  useGetKelolaTestMutation,
  useCreateKelolaTestMutation,
  useEditKelolaTestMutation,
  useDeleteKelolaTestMutation,
} = kelolaTestApi;
