import { useEffect, Suspense, useCallback, Fragment } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ConfigProvider as AntdProvider, App as AntdApp, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { cookie } from "hyl-utils";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import menus from "@/router";
import { Loading, Redirect } from "@/components";
import { changeBlogTitle } from "@/utils";
import { useGetData, useRedux, useScroll } from "@/hooks";
import Header from "./Header";
import starBg from "./widgets/starBg";
import FloatButton from "./widgets/FloatButton";
import "./style.scss";

function Layout() {
  const location = useLocation();

  const { top } = useScroll();

  const { store } = useRedux();

  useGetData("/all/getCsrfToken", {
    progress: false,
    manual: !!cookie.get("csrf_token"),
  });

  useGetData("/music/query", {
    progress: false,
    onSuccess: (res) => {
      const data = res.data.map((item) => ({
        ...item,
        url: `${globalConfig.remoteStaticUrl}/music/${item.url}`,
      }));

      new APlayer({
        container: document.getElementById("aplayer"),
        audio: data, // 音乐信息
        fixed: true, // 开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: store.autoplay, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      });
    },
  });

  // 路由监听
  useEffect(() => {
    window.scrollTo(0, 0);

    changeBlogTitle(location.pathname);
  }, [location]);

  // 主题监听
  useEffect(() => {
    if (!store.simple) {
      // starBg(store.theme.bg);
    }

    AntdProvider.config({
      theme: {
        primaryColor: store.theme.color,
      },
    });
  }, [store.theme]);

  // 黑夜模式监听
  useEffect(() => {
    const body = document.querySelector("body")!;
    if (store.dark) {
      body.id = "dark";
      starBg(store.theme.bg);
    } else {
      body.id = "light";

      const bg: any = document.querySelector("#canvasBg")!;
      bg.style.display = "none";
    }
  }, [store.dark]);

  // 下拉监听
  useEffect(() => {
    const header = document.querySelector("header")!;
    if (top > 10) {
      header.id = "headerTop";
    } else {
      header.id = "";
    }
  }, [top]);

  const renderRoutes = useCallback(
    (menu: any) =>
      menu.map(({ path, children, index, title, ...item }: any) => {
        return (
          <Fragment key={path}>
            {index && (
              <Route
                index={true}
                element={
                  <Suspense fallback={<Loading />}>
                    <item.component twoRouter={children} />
                  </Suspense>
                }
              />
            )}
            <Route
              path={path}
              key={path}
              element={
                <Suspense fallback={<Loading />}>
                  <item.component twoRouter={children} />
                </Suspense>
              }
            >
              {children && renderRoutes(children)}
            </Route>
          </Fragment>
        );
      }),
    []
  );

  const isHome = location.pathname === "/home";

  return (
    <AntdProvider
      theme={{
        token: {
          colorPrimary: store.theme.color,
          fontFamily: "font",
        },
        algorithm: store.dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <StyleProvider hashPriority="high">
          <div id="backgroundImg">
            <canvas id="canvasBg"></canvas>
          </div>
          <div id="aplayer"></div>
          <Header style={{ display: isHome && "none" }} />
          <main id="main" className={!isHome ? "isHome" : ""}>
            <Routes>
              {renderRoutes(menus)}
              <Route path="/" element={<Redirect to="/home" />} />
              <Route path="*" element={<Redirect to="/404" />} />
            </Routes>
          </main>

          <footer>
            <span className="AllRights">
              ©2021-2022 by <a href="https://motion.ant.design">心 念</a> All
              Rights Reserved
            </span>
            <a
              className="beianNumber"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13028102000185"
            >
              <img src={require("@/assets/img/备案图标.png")} />
              冀公网安备 13028102000185号
            </a>
            <a href="https://beian.miit.gov.cn/" className="icp">
              京ICP备2021033841号-2
            </a>
          </footer>

          <FloatButton />
        </StyleProvider>
      </AntdApp>
    </AntdProvider>
  );
}

export default Layout;
