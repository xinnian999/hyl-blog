import { store } from "@/config";
import { cookie } from "hyl-utils";
import request from "./request";

const clearLogin = () => {
  request.post("/qq/clearLoginInfo").then((res) => {
    if (res) {
      store.dispatch({ type: "CHANGE_LOGIN_STATE", payload: false });
      cookie.remove("blog_token");
    }
  });
};

export default clearLogin;
