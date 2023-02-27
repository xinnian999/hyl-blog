import { ConfigProvider as AntdProvider, App as AntdApp, theme } from "antd";
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRedux } from "@/hooks";
import { changeBlogTitle } from "@/utils";

function Provider({ children }) {
  const { store } = useRedux();

  const location = useLocation();

  // 路由监听
  useEffect(() => {
    window.scrollTo(0, 0);

    changeBlogTitle(location.pathname);
  }, [location]);

  // 主题监听
  useEffect(() => {
    AntdProvider.config({
      theme: {
        primaryColor: store.theme.color,
      },
    });
  }, [store.theme]);

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
        <StyleProvider
          hashPriority="high"
          transformers={[legacyLogicalPropertiesTransformer]}
        >
          {children}
        </StyleProvider>
      </AntdApp>
    </AntdProvider>
  );
}

export default Provider;
