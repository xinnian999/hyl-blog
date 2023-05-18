import Header from "./Header";
import Provider from "./Provider";
import Footer from "./Footer";
import Main from "./Main";
import { Music, FloatButton, Background, Login } from "./widgets";
import { useLocation } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation();

  return (
    <Provider>
      {pathname !== "/home" && <Header />}
      <Main />
      {pathname !== "/home" && <Footer />}
      <Background />
      <Login />
      <Music />
      {pathname !== "/home" && <FloatButton />}
    </Provider>
  );
}

export default Layout;
