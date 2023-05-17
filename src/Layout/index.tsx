import Header from "./Header";
import Provider from "./Provider";
import Footer from "./Footer";
import Main from "./Main";
import { Music, FloatButton, Background } from "./widgets";
import { useLocation } from "react-router-dom";
import Login from "./Login";

function Layout() {
  const { pathname } = useLocation();
  return (
    <Provider>
      {pathname !== "/home" && <Header />}
      <Main />
      <Footer />
      <Background />
      <Login />
      <Music />
      {pathname !== "/home" && <FloatButton />}
    </Provider>
  );
}

export default Layout;
