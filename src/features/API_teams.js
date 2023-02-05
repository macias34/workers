import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teamsApi = createApi({
  reducerPath: "teamsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/teams" }),
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetTeamsQuery } = teamsApi;
