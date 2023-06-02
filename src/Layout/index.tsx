import { useLocation } from "react-router-dom";
import Provider from "./Provider";
import { Header, Main, Footer } from "./root";
import { Music, FloatButton, Background } from "./widgets";
import { Login } from "./floatTier";

function Layout() {
  const localtion = useLocation();

  const isRoot = localtion.pathname === "/";

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
