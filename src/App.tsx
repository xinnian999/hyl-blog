import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "@/Layout";
import { Error } from "@/components";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { stopWriteLoading } from "@/utils";
import { useMount } from "@/hooks";

function App() {
  useMount(() => {
    stopWriteLoading();
  });

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default Error(App);
