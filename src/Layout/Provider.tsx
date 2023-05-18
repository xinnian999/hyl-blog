import {
  ConfigProvider as AntdProvider,
  App as AntdApp,
  theme as antTheme,
  notification,
} from "antd";
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider as AntdStyleProvider,
} from "@ant-design/cssinjs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cookie, removeDom, imgPrestrain, url } from "hyl-utils";
import { ThemeProvider as StyledProvider } from "styled-components";
import {
  useGetData,
  useMount,
  useRedux,
  useScroll,
  useWindowSize,
} from "@/hooks";
import prestrainImage from "@/prestrainImage";
import { changeBlogTitle } from "@/utils";
import starBg from "./widgets/Background/starBg";

notification.config({
  placement: "topRight",
  top: 80,
  duration: 3,
  rtl: true,
});

function Provider({ children }) {
  const location = useLocation();

  const {
    store: {
      globalStore: { dark, theme },
    },
    batchDispatch,
  } = useRedux();

  const { width } = useWindowSize();

  const { top } = useScroll();

  useMount(() => {
    imgPrestrain(prestrainImage);
    removeDom("#loading-box");

    document.addEventListener("copy", () => {
      var selecter = window.getSelection()?.toString();
      if (selecter) {
        return notification.success({
          message: "阁下，复制成功了！转载要记得标明出处哦～～",
          style: { top: "80px" },
        });
      }

      notification.error({
        message: "复制失败了，请勾选需要复制的内容哦",
      });
    });
  });

  useGetData("/all/getCsrfToken", {
    progress: false,
    manual: !!cookie.get("csrf_token"),
  });

  useGetData("/qq/getLoginStatus", {
    manual: !url.getParams().getUserInfo,
    progress: false,
    onSuccess(res) {
      batchDispatch([
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
    const { color, bg } = theme;
    AntdProvider.config({
      theme: {
        primaryColor: color,
      },
    });
    if (dark) {
      starBg(bg);
    }
  }, [theme]);

  // 窗口监听
  useEffect(() => {
    const htmlEl = window.document.documentElement;
    const width = htmlEl.getBoundingClientRect().width;

    if (width < globalConfig.rootValue * 10) {
      htmlEl.style.fontSize = `${width / 10}px`;
    } else {
      htmlEl.style.fontSize = `${globalConfig.rootValue}px`;
    }

    // if (dark) {
    //   starBg(theme.bg);
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

  const styledGlobalProps = {
    location,
    isMoblie: width < 800,
    scrollTop: top,
    isDark: dark,
  };

  return (
    <AntdProvider
      theme={{
        token: {
          colorPrimary: theme.color,
          fontFamily: "font",
        },
        algorithm: dark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        <AntdStyleProvider
          hashPriority="high"
          transformers={[legacyLogicalPropertiesTransformer]}
        >
          <StyledProvider theme={styledGlobalProps}>{children}</StyledProvider>
        </AntdStyleProvider>
      </AntdApp>
    </AntdProvider>
  );
}

export default Provider;
