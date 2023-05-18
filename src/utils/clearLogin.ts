import { store } from "@/store";
import { cookie } from "hyl-utils";
import request from "./request";
import { message } from "antd";

const clearLogin = () => {
  request.post("/qq/clearLoginInfo").then((res) => {
    if (res) {
      store.dispatch({ type: "CHANGE_LOGIN_STATE", payload: false });
      cookie.remove("blog_token");
      cookie.remove("vip_token");
      message.success("已退出登陆");
    }
  });
};

export default clearLogin;
