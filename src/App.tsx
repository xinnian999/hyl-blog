import { BrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import { Error } from "@/components";

const App = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default Error(App);
