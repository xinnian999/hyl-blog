import {ConfigProvider as AntdProvider, notification, theme as antTheme,} from "antd";
import {legacyLogicalPropertiesTransformer, StyleProvider as AntdStyleProvider,} from "@ant-design/cssinjs";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {cookie, imgPrestrain, removeDom, url} from "hyl-utils";
import {ThemeProvider as StyledProvider} from "styled-components";
import {useGetData, useMount, useRootStore, useScroll, useWindowSize,} from "@/hooks";
import prestrainImage from "@/prestrainImage";
import {changeBlogTitle} from "@/utils";
import {Error} from "@/components";
import GlobalStyle from "./GlobalStyle";


notification.config({
    placement: "topRight",
    top: 80,
    duration: 3,
    rtl: true,
});

document.addEventListener("copy", () => {
    const selected = window.getSelection()?.toString();
    if (selected) {
        return notification.success({
            message: "阁下，复制成功了！转载要记得标明出处哦～～",
            style: {top: "80px"},
        });
    }

    notification.error({
        message: "复制失败了，请勾选需要复制的内容哦",
    });
});

function Provider({children}) {
    const location = useLocation();
    const {theme, primaryColor, setRootState} = useRootStore();

    const {width} = useWindowSize();

    const {top} = useScroll();

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
            setRootState({loginModal: true, userInfo: res, loginState: true});
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
                <StyledProvider theme={styledGlobalProps}>
                    <GlobalStyle/>
                    {children}
                </StyledProvider>
            </AntdStyleProvider>
        </AntdProvider>
    );
}

export default Error(Provider);
