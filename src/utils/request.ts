import { notification } from "antd";
import { cookie, ajax } from "hyl-utils";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { store } from "@/store";

const request = ajax.create({
  baseURL: "/api",
  timeout: 15000,
  withCredentials: true,
});

request.interceptors = {
  beforeRequest(config) {
    config.csrfHeaderName = "X-CSRF-TOKEN";
    config.csrfCookieName = "csrf_token";
    return config;
  },
  errorRequest(err) {
    return err;
  },
  beforeResponse(res) {
    // 关闭顶部加载进度条
    Nprogress.done();

    if (res.response.message) {
      notification.error({
        message: "接口错误",
        description: res.response.message,
      });
    }

    // 监听登陆是否失效：
    if (!cookie.get("blog_token")) {
      store.dispatch({
        type: "CHANGE_LOGIN_STATE",
        payload: false,
      });
    }

    return res.response;
  },

  errorResponse(err) {
    const { status } = err;

    switch (status) {
      case 504:
        notification.error({
          message: status,
          description: "请求超时",
        });

        break;
      case 502:
        notification.error({
          message: status,
          description: "后端服务挂了",
        });
        break;
      case 500:
        notification.error({
          message: status,
          description: "请求接口异常",
        });
        break;
      case 404:
        notification.error({
          message: status,
          description: "请求接口不存在",
        });
        break;
      default:
        notification.error({
          message: status,
          description: "请求接口失败",
        });
        break;
    }

    return err;
  },
};

export default request;
