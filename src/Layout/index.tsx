import Provider from "./Provider";
import { Header, Main, Footer } from "./root";
import { Music, FloatButton, Background } from "./widgets";
import FloatTier from "./floatTier";

function Layout() {
  return (
    <Provider>
      <Header />
      <Main />
      <Footer />
      <Background />
      <Music />
      <FloatButton />
      <FloatTier />
    </Provider>
  );
}

export default Layout;
