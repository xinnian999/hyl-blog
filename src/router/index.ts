import { lazy } from "react";
import {
  HomeOutlined,
  GitlabOutlined,
  FormOutlined,
  UsergroupAddOutlined,
  CrownOutlined,
} from "@ant-design/icons";

const route = [
  {
    title: "博客",
    icon: HomeOutlined,
    path: "/home",
    component: lazy(() => import("@/views/Home")),
  },
  {
    title: "文章",
    icon: CrownOutlined,
    path: "/article",
    component: lazy(() => import("@/views/Article")),
  },
  {
    title: "日志",
    icon: FormOutlined,
    path: "/journal",
    component: lazy(() => import("@/views/Journal")),
    children: [
      {
        title: "说说",
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
        component: lazy(() => import("@/views/Journal/Note")),
      },
    ],
  },
  {
    title: "友链",
    icon: UsergroupAddOutlined,
    path: "/link",
    component: lazy(() => import("@/views/Link")),
  },
  {
    title: "留言",
    icon: GitlabOutlined,
    path: "/message",
    component: lazy(() => import("@/views/Message")),
  },
  {
    title: "资源",
    // icon: GitlabOutlined,
    path: "/resource",
    component: lazy(() => import("@/views/Resource")),
    children: [
      {
        title: "个人作品",
        index: true,
        component: lazy(() => import("@/views/Resource/Works")),
      },
      {
        title: "珍藏",
        path: "Collection",
        component: lazy(() => import("@/views/Resource/Collection")),
      },
    ],
  },
  {
    title: "关于",
    icon: GitlabOutlined,
    path: "/about",
    component: lazy(() => import("@/views/About")),
  },
  {
    path: "/article/:id",
    component: lazy(() => import("@/views/Article/ArticleDetail")),
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
