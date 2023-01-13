import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "@/Layout";
import { Error } from "@/components";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { stopWriteLoading } from "@/utils";
import { useMount } from "@/hooks";
import { getRandom } from "hyl-utils";

function App() {
  useMount(() => {
    stopWriteLoading();

    console.log(getRandom(1, 20));
    console.log(getRandom(1, 20));
    console.log(getRandom(1, 20));
    console.log(getRandom(1, 20));
    console.log(getRandom(1, 20));
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
