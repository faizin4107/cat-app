import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseurl from "@/constant/baseurl";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseurl.apiUrl
  }),
  endpoints: (builder) => ({}),
});
