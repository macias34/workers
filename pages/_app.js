import "../styles/globals.css";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { jobPositionsApi } from "@/src/features/API_jobPositions";
import { teamsApi } from "@/src/features/API_teams";
import { workersApi } from "@/src/features/API_workers";
import { Provider } from "react-redux";
import Layout from "@/src/components/Layout/Layout";

export const store = configureStore({
  reducer: {
    [jobPositionsApi.reducerPath]: jobPositionsApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [workersApi.reducerPath]: workersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      jobPositionsApi.middleware,
      teamsApi.middleware,
      workersApi.middleware,
    ]);
  },
});

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
export default App;
