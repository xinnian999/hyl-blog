import { Provider as ReduxProvider } from "react-redux";
import Layout from "@/Layout";
import { Error } from "@/components";
import { store, persistor, prestrainImage } from "@/config";
import { PersistGate } from "redux-persist/integration/react";
import { useGetData, useMount } from "@/hooks";
import { BrowserRouter } from "react-router-dom";
import { cookie, removeDom, imgPrestrain } from "hyl-utils";

function App() {
  useMount(() => {
    imgPrestrain(prestrainImage);
    removeDom("#loading-box");
  });

  useGetData("/all/getCsrfToken", {
    progress: false,
    manual: !!cookie.get("csrf_token"),
  });

  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default Error(App);
