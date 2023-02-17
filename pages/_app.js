import { Provider } from "react-redux";
import { reduxStore } from "@/src/stores/reduxStore";
import Layout from "@/src/components/Layout/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={reduxStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
export default App;
