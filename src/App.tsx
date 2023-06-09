import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import { Error } from "@/components";
import { store, persistor } from "@/config";

function App() {
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
