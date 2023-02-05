import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const workersApi = createApi({
  reducerPath: "workersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/workers" }),
  endpoints: (builder) => ({
    getWorkers: builder.query({
      query: () => "",
    }),
    getWorkerByID: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetWorkersQuery, useGetWorkerByIDQuery } = workersApi;
