import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { StyleProvider } from "@ant-design/cssinjs";
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
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <StyleProvider hashPriority="high">
              <Layout />
            </StyleProvider>
          </BrowserRouter>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default Error(App);
