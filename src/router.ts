import { lazy } from "react";

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
    path: "/journal",
    component: lazy(() => import("@/views/Journal")),
    icon: "icon-houtaiweihurizhi",
    children: [
      {
        title: "所有文章",
        path: "article",
        index: true,
        icon: "icon-guidang",
        component: lazy(() => import("@/views/Journal/File/index")),
      },
      {
        title: "标签",
        path: "tag",
        icon: "icon-guidang",
        component: lazy(() => import("@/views/Journal/File/index")),
      },
      {
        title: "归档",
        path: "file",
        icon: "icon-guidang",
        component: lazy(() => import("@/views/Journal/File/index")),
      },
      {
        title: "笔记",
        path: "note",
        icon: "icon-jibiji",
        component: lazy(() => import("@/views/Journal/Note/Note")),
      },
    ],
  },

  {
    title: "实验室",
    path: "/resource",
    icon: "icon-lianjie",
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
    title: "导航",
    path: "/friend",
    icon: "icon-guanyu",
    component: lazy(() => import("@/views/Friend")),
    children: [
      {
        title: "哔哔",
        path: "say",
        icon: "icon-shuoshuo",
        component: lazy(() => import("@/views/Journal/Say")),
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
      {
        title: "关于本站",
        path: "about",
        icon: "icon-guanyu",
        component: lazy(() => import("@/views/About")),
      },
    ],
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
