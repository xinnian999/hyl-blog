import Provider from "./Provider";
import { Header, Main, Footer } from "./root";
import {
  Music,
  FloatButton,
  Background,
  FrameNum,
  Wave,
  Login,
} from "./widgets";
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
      <FrameNum />
      <AntdFloatButton.BackTop />
      <Login />
    </Provider>
  );
}

export default Layout;
