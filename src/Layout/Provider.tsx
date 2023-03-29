import { ConfigProvider as AntdProvider, App as AntdApp, theme } from "antd";
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider as AntdStyleProvider,
} from "@ant-design/cssinjs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cookie, removeDom, imgPrestrain, url } from "hyl-utils";
import {
  useGetData,
  useMount,
  useRedux,
  useScroll,
  useWindowSize,
} from "@/hooks";
import { prestrainImage } from "@/config";
import { changeBlogTitle } from "@/utils";
import starBg from "./widgets/Background/starBg";

function Provider({ children }) {
  const location = useLocation();

  const { dispatchAll, store } = useRedux();

  const { width } = useWindowSize();

  const { top } = useScroll();

  useMount(() => {
    imgPrestrain(prestrainImage);
    removeDom("#loading-box");
  });

  useGetData("/all/getCsrfToken", {
    progress: false,
    manual: !!cookie.get("csrf_token"),
  });

  useGetData("/qq/getLoginStatus", {
    manual: !url.getParams("getUserInfo"),
    progress: false,
    onSuccess(res) {
      dispatchAll([
        {
          type: "CHANGE_LOGIN_STATE",
          payload: true,
        },
        {
          type: "CHANGE_USER_INFO",
          payload: res,
        },
        { type: "CHANGE_LOGIN_MODAL", payload: false },
      ]);
    },
  });

  // 路由监听
  useEffect(() => {
    window.scrollTo(0, 0);

    changeBlogTitle(location.pathname);
  }, [location]);

  // 主题监听
  useEffect(() => {
    const { color, bg } = store.theme;
    AntdProvider.config({
      theme: {
        primaryColor: color,
      },
    });
    if (store.dark) {
      starBg(bg);
    }
  }, [store.theme]);

  // 窗口监听
  useEffect(() => {
    const htmlEl = window.document.documentElement;
    const width = htmlEl.getBoundingClientRect().width;

    if (width < globalConfig.rootValue * 10) {
      htmlEl.style.fontSize = `${width / 10}px`;
    } else {
      htmlEl.style.fontSize = `${globalConfig.rootValue}px`;
    }

    // if (store.dark) {
    //   starBg(store.theme.bg);
    // }
  }, [width]);

  // 页面滚动监听
  useEffect(() => {
    const lrcEl = document.querySelector(".aplayer-lrc") as HTMLElement;

    if (lrcEl) {
      if (
        top + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
      ) {
        lrcEl.style.display = "none";
      } else {
        lrcEl.style.display = "block";
      }
    }
  }, [top]);

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
        <AntdStyleProvider
          hashPriority="high"
          transformers={[legacyLogicalPropertiesTransformer]}
        >
          {children}
        </AntdStyleProvider>
      </AntdApp>
    </AntdProvider>
  );
}

export default Provider;
