import { useEffect, Suspense, useMemo, useCallback } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { BackTop, ConfigProvider, Modal } from "antd";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import cookie from "js-cookie";
import menus from "@/router";
import { Loading, Redirect } from "@/components";
import { changeBlogTitle, getDecode, globalConfig } from "@/utils";
import { useRequest, useRedux } from "@/hooks";
import Header from "./Header";
import "./style.scss";

const { confirm } = Modal;

let music: any;

function Layout() {
  const location = useLocation();

  const { store, dispatch } = useRedux();

  useRequest("/all/getCsrfToken", {
    progress: false,
    manual: !!cookie.get("csrf_token"),
  });

  useRequest("/music/query", {
    progress: false,
    onSuccess: (res) => {
      const data = res.data.map((item) => ({
        ...item,
        url: `${globalConfig.remoteStaticUrl}/music/${item.url}`,
      }));

      music = new APlayer({
        container: document.getElementById("aplayer"),
        audio: data, // 音乐信息
        fixed: true, // 开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: store.autoplay, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
      });

      if (store.autoplay === undefined) {
        confirm({
          content: "播放背景音乐吗？(可在左下角操控)",
          okText: "播放",
          cancelText: "不播放",
          onOk() {
            music.play();
            dispatch({
              type: "CHANGE_AUTOPLAY",
              payload: true,
            });
          },
          onCancel() {
            music.pause();
            dispatch({
              type: "CHANGE_AUTOPLAY",
              payload: false,
            });
          },
        });
      }
    },
  });

  // 路由监听
  useEffect(() => {
    window.scrollTo(0, 0);

    changeBlogTitle(location.pathname);
  }, [location]);

  // 主题监听
  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: store.theme.color,
      },
    });
  }, [store.theme]);

  useEffect(() => {
    const username = cookie.get("qqName");
    const headPicture = cookie.get("qqAvatar");
    if (cookie.get("blog_token")) {
      dispatch({
        type: "CHANGE_LOGIN_STATE",
        payload: true,
      });
    }
    if (username && headPicture) {
      const id = headPicture.substring(
        headPicture.length - 10,
        headPicture.length
      );
      dispatch({
        type: "CHANGE_USER_INFO",
        payload: {
          username: getDecode(username),
          headPicture,
          id,
        },
      });
    }

    const loadingDom: any = document.querySelector("#loading-box");
    if (loadingDom) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loadingDom.style.display = "none";
    }
  }, []);

  const renderMenus = useMemo(
    () =>
      menus.map((item: any) => {
        const { title, path, search } = item;
        if (title) {
          return (
            <NavLink key={title} to={{ pathname: path, search }}>
              <li>{title}</li>
            </NavLink>
          );
        }
        return null;
      }),
    []
  );

  const renderRoutes = useCallback(
    (menu: any) =>
      menu.map(({ path, children, index, title, ...item }: any) => {
        return (
          <Route
            path={path}
            key={path || title}
            index={index}
            element={
              <Suspense fallback={<Loading />}>
                <item.component twoRouter={children} />
              </Suspense>
            }
          >
            {children && renderRoutes(children)}
          </Route>
        );
      }),
    []
  );

  const isHome = location.pathname === "/home";

  const bg = {
    backgroundImage: `url(${require(`@/assets/img/bg/${store.theme.bg}`)})`,
  };

  return (
    <>
      <div id="backgroundImg" style={bg} />
      <div id="aplayer"></div>
      {!isHome && <Header menus={renderMenus} />}
      <main id="main" className={!isHome ? "isHome" : ""}>
        <Routes>
          {renderRoutes(menus)}
          <Route path="/" element={<Redirect to="/home" />} />
          <Route path="*" element={<Redirect to="/404" />} />
        </Routes>
      </main>

      <footer>
        <span className="AllRights">
          ©2021-2022 by <a href="https://motion.ant.design">心 念</a> All Rights
          Reserved
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
      <BackTop />
    </>
  );
}

export default Layout;
