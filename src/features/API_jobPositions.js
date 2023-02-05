import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobPositionsApi = createApi({
  reducerPath: "jobPositionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/job_positions" }),
  endpoints: (builder) => ({
    getJobPositions: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetJobPositionsQuery } = jobPositionsApi;
