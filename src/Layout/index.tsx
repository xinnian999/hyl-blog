import { FloatButton as AntdFloatButton } from 'antd';
import Provider from './Provider';
import { Footer, Header, Main } from './root';
import { Background, FrameNum, Login, Music, Wave } from './widgets';

const Layout = () => (
  <Provider>
    <Header />
    <Main />
    <Footer />
    <Wave />
    <Background />
    <Music />
    <FrameNum />
    <AntdFloatButton.BackTop />
    <Login />
  </Provider>
);

export default Layout;
