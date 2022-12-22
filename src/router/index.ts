import { lazy } from "react";

const route = [
  {
    title: "首页",
    path: "/home",
    icon: "icon-shouye",
    component: lazy(() => import("@/views/Home")),
  },
  {
    title: "文章",
    path: "/article",
    search: "?category=all",
    icon: "icon-wenzhang",
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
        path: "journal",
        index: true,
        component: lazy(() => import("@/views/Journal/Journal")),
      },
      {
        title: "归档",
        path: "file",
        component: lazy(() => import("@/views/Journal/File")),
      },
      {
        title: "笔记",
        path: "note",
        component: lazy(() => import("@/views/Journal/Note/Note")),
      },
    ],
  },
  {
    title: "友链",
    path: "/link",
    icon: "icon-LINKS",
    component: lazy(() => import("@/views/Link")),
  },
  {
    title: "留言",
    path: "/message",
    icon: "icon-liuyan",
    component: lazy(() => import("@/views/Message")),
  },
  {
    title: "作品",
    path: "/resource",
    icon: "icon-ziyuan",
    component: lazy(() => import("@/views/Resource")),
    children: [
      {
        title: "个人作品",
        index: true,
        path: "works",
        component: lazy(() => import("@/views/Resource/Works")),
      },
      {
        title: "珍藏",
        path: "collection",
        component: lazy(() => import("@/views/Resource/Collection")),
      },
    ],
  },
  {
    title: "关于",
    path: "/about",
    icon: "icon-guanyu1",
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
