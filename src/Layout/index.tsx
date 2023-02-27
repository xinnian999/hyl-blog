import Header from "./Header";
import Provider from "./Provider";
import Footer from "./Footer";
import Main from "./Main";
import { Music, FloatButton, Background } from "./widgets";

function Layout() {
  return (
    <Provider>
      <Header />
      <Main />
      <Footer />
      <Background />
      <Music />
      <FloatButton />
    </Provider>
  );
}

export default Layout;
