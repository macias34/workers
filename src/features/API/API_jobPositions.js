import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobPositionsApi = createApi({
  reducerPath: "jobPositionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/job_positions" }),
  endpoints: (builder) => ({
    getJobPositions: builder.query({
      query: () => "",
    }),
    getJobPositionByID: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetJobPositionsQuery, useGetJobPositionByIDQuery } =
  jobPositionsApi;
