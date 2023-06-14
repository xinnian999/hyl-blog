import Provider from "./Provider";
import { Header, Main, Footer } from "./root";
import { Music, FloatButton, Background, FrameNum } from "./widgets";
import FloatTier from "./floatTier";
import Banner from "@/components/Plate/Banner";

function Layout() {
  return (
    <Provider>
      <Header />
      {/* <Banner /> */}
      <Main />
      <Footer />
      <Background />
      <Music />
      <FloatButton />
      <FloatTier />
      <FrameNum />
    </Provider>
  );
}

export default Layout;
