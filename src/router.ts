import {lazy} from "react";

const route: routeItem[] = [
    {
        title: "主页",
        path: globalConfig.homePage,
        icon: "icon-shouye1",
        component: lazy(() => import("@/views/Home")),
    },
    {
        path: "/search",
        component: lazy(() => import("@/views/Search")),
    },
    {
        path: "/article/:id",
        component: lazy(() => import("@/views/Home/ArticleDetail")),
    },
    {
        title: "文库",
        path: "/library",
        component: lazy(() => import("@/views/library")),
        icon: "icon-houtaiweihurizhi",
        children: [
            {
                title: "文章列表",
                path: "articleList",
                index: true,
                icon: "icon-wenzhang1",
                component: lazy(() => import("@/views/library/ArticleList")),
            },
            {
                title: "标签",
                path: "tag",
                icon: "icon-biaoqian2",
                component: lazy(() => import("@/views/library/Tag")),
            },
            {
                title: "归档",
                path: "file",
                icon: "icon-guidang",
                component: lazy(() => import("@/views/library/File")),
            },
            {
                title: "笔记",
                path: "note",
                icon: "icon-jibiji",
                component: lazy(() => import("@/views/library/Note")),
            },
        ],
    },

    {
        title: "实验室",
        path: "/resource",
        icon: "icon-ziyuan1",
        component: lazy(() => import("@/views/Resource")),
        children: [
            {
                title: "项目展示",
                path: "work",
                index: true,
                icon: "icon-liuyan1",
                component: lazy(() => import("@/views/Resource/Works")),
            },
            {
                title: "chatGpt",
                path: "chatgpt",
                icon: "icon-jiqiren",
                component: lazy(() => import("@/views/ChatGpt")),
            },
            {
                title: "收藏",
                path: "like",
                icon: "icon-jiqiren",
                component: lazy(() => import("@/views/Resource/Collection")),
            },
        ],
    },

    {
        title: "社交",
        path: "/friend",
        icon: "icon-LINKS",
        component: lazy(() => import("@/views/Friend")),
        children: [
            {
                title: "哔哔",
                path: "say",
                icon: "icon-shuoshuo",
                component: lazy(() => import("src/views/Friend/Say")),
            },
            {
                title: "留言板",
                path: "message",
                index: true,
                icon: "icon-liuyan1",
                component: lazy(() => import("@/views/Friend/Message")),
            },
            {
                title: "友情链接",
                path: "link",
                icon: "icon-lianjie",
                component: lazy(() => import("@/views/Friend/Link")),
            },

        ],
    },
    {
        title: "关于",
        path: "/about",
        icon: "icon-guanyu",
        component: lazy(() => import("@/views/About")),
    },
    {
        path: "/demo",
        component: lazy(() => import("@/views/Demo")),
    },
    {
        path: "/404",
        component: lazy(() => import("@/views/404")),
    },
];

export default route;
