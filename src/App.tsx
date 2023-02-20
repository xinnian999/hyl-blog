import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "@/Layout";
import { Error } from "@/components";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { stopWriteLoading } from "@/utils";
import { useMount } from "@/hooks";

function App() {
  useMount(() => {
    stopWriteLoading();

    window.addEventListener("scroll", () => {
      const imgList = document.querySelectorAll("[data-src]");

      imgList.forEach((item: any) => {
        item.childNodes[0].src = item.attributes["data-src"].value;
      });
    });
  });

  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

export default Error(App);
