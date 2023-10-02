import { apiSlice } from "../apiSlice";
import { getTokenFromLocalStorage } from "../../localStorage";

export const sliceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.mutation({
      query: (path) => ({
        url: path,
        headers: {
          "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
        }
      })
    }),
    createData: builder.mutation({
      query: (post) => ({
        url: post.path,
        method: "POST",
        body: post.post,
        headers: {
          "Authorization": `Bearer ${getTokenFromLocalStorage()}`,
        },
        formData:true  
      }),
    }),
  }),
});

export const {
  useGetDataMutation,
  useCreateDataMutation
} = sliceApi;
