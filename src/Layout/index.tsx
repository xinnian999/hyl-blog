import Header from "./Header";
import Provider from "./Provider";
import Footer from "./Footer";
import Main from "./Main";
import { Music, FloatButton, Background, Login } from "./widgets";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";

function Layout() {
  const { pathname } = useLocation();

  const isRoot = pathname === "/";

  return (
    <Provider>
      {!isRoot && <Header />}
      <Main />
      {!isRoot && <Footer />}
      <Background />
      <Login />
      <Music />
      <FloatButton />
    </Provider>
  );
}

export default Layout;
