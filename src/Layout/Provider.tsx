import {
  ConfigProvider as AntdProvider,
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
  useScroll,
  useWindowSize,
  useGlobalStore,
} from "@/hooks";
import prestrainImage from "@/prestrainImage";
import { changeBlogTitle } from "@/utils";

notification.config({
  placement: "topRight",
  top: 80,
  duration: 3,
  rtl: true,
});

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

function Provider({ children }) {
  const location = useLocation();
  const { theme, primaryColor, setGlobalState } = useGlobalStore();

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
    manual: !url.getParams().getUserInfo,
    progress: false,
    onSuccess(res: any) {
      setGlobalState({ loginModal: true, userInfo: res, loginState: true });
    },
  });

  // 路由监听
  useEffect(() => {
    window.scrollTo(0, 0);

    changeBlogTitle(location.pathname);
  }, [location]);

  // 主题监听
  useEffect(() => {
    AntdProvider.config({
      theme: {
        primaryColor,
      },
    });
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
    isDark: theme === "dark",
  };

  return (
    <AntdProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          fontFamily: "font",
        },
        algorithm:
          theme === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      }}
    >
      <AntdStyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
      >
        <StyledProvider theme={styledGlobalProps}>{children}</StyledProvider>
      </AntdStyleProvider>
    </AntdProvider>
  );
}

export default Provider;
