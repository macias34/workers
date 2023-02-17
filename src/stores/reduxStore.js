import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { jobPositionsApi } from "@/src/features/API/API_jobPositions";
import { teamsApi } from "@/src/features/API/API_teams";
import { workersApi } from "@/src/features/API/API_workers";
import workersReducer from "../features/workers/workersSlice";
import jobPositionsReducer from "../features/jobPositions/jobPositionsSlice";
import teamsReducer from "../features/teams/teamsSlice";
import bossesReducer from "../features/bosses/bossesSlice";
import notificationReducer from "../features/notification/notificationSlice";

export const reduxStore = configureStore({
  reducer: {
    [jobPositionsApi.reducerPath]: jobPositionsApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [workersApi.reducerPath]: workersApi.reducer,
    workers: workersReducer,
    jobPositions: jobPositionsReducer,
    teams: teamsReducer,
    bosses: bossesReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      jobPositionsApi.middleware,
      teamsApi.middleware,
      workersApi.middleware,
    ]);
  },
});
