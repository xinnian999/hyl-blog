import { lazy } from "react";

const route: routeItem[] = [
  {
    path: "/",
    icon: "icon-shouye1",
    component: lazy(() => import("@/views/Home")),
  },
  {
    title: "文章",
    path: "/article",
    icon: "icon-wenzhang1",
    component: lazy(() => import("@/views/Article")),
  },
  {
    path: "/article/:id",
    component: lazy(() => import("@/views/Article/ArticleDetail")),
  },
  {
    title: "日志",
    path: "/journal",
    component: lazy(() => import("@/views/Journal")),
    icon: "icon-houtaiweihurizhi",
    children: [
      {
        title: "说说",
        path: "say",
        index: true,
        icon: "icon-shuoshuo",
        component: lazy(() => import("@/views/Journal/Say")),
      },
      {
        title: "作品",
        index: true,
        path: "works",
        icon: "icon-ziyuan1",
        component: lazy(() => import("@/views/Resource/Works")),
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
    title: "社交",
    path: "/friend",
    icon: "icon-lianjie",
    component: lazy(() => import("@/views/Friend")),
    children: [
      {
        title: "留言",
        path: "message",
        index: true,
        icon: "icon-liuyan1",
        component: lazy(() => import("@/views/Friend/Message")),
      },
      {
        title: "友链",
        path: "link",
        icon: "icon-lianjie",
        component: lazy(() => import("@/views/Friend/Link")),
      },
    ],
  },
  // {
  //   title: "ChatGpt",
  //   path: "/chatgpt",
  //   icon: "icon-jiqiren",
  //   component: lazy(() => import("@/views/ChatGpt")),
  // },
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
