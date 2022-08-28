import axios from "axios";
import { Modal } from "antd";
import cookie from "js-cookie";
import { store } from "@/store";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

const request: any = axios.create({
  baseURL: "/api",
  timeout: 15000,
  withCredentials: true,
});

request.interceptors.request.use((config: any) => {
  config.xsrfHeaderName = "X-CSRF-TOKEN";
  config.xsrfCookieName = "csrf_token";

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (res: any) => {
    // 关闭顶部加载进度条
    Nprogress.done();

    if (res.data.message) {
      Modal.warning({
        title: "接口错误",
        content: res.data.message,
      });
    }

    // 监听登陆是否失效：
    if (!cookie.get("blog_token")) {
      store.dispatch({
        type: "CHANGE_LOGIN_STATE",
        payload: false,
      });
    }

    return res?.data;
  },
  (err: any) => {
    const { status } = err.response;
    switch (status) {
      case 504:
        Modal.error({
          title: status,
          content: "请求超时",
        });
        break;
      case 500:
        Modal.error({
          title: status,
          content: "请求接口异常",
        });
        break;
      case 404:
        Modal.error({
          title: status,
          content: "请求接口不存在",
        });
        break;
      default:
        Modal.error({
          title: status,
          content: "请求接口失败",
        });
        break;
    }
  }
);

export default request;
