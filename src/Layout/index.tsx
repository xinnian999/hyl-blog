import Provider from "./Provider";
import { Header, Main, Footer } from "./root";
import { Music, FloatButton, Background, FrameNum, Wave } from "./widgets";
import FloatTier from "./floatTier";
import { FloatButton as AntdFloatButton } from "antd";

function Layout() {
  return (
    <Provider>
      <Header />
      <Main />
      <Footer />
      <Wave />
      <Background />
      <Music />
      {/* <FloatButton /> */}
      <FloatTier />
      <FrameNum />
      <AntdFloatButton.BackTop />
    </Provider>
  );
}

export default Layout;
