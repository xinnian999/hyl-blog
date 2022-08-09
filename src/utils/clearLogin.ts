import { store } from "@/store";
import cookie from "js-cookie";

const clearLogin = () => {
  store.dispatch({ type: "CHANGE_LOGIN_STATE", payload: false });
  cookie.remove("blog_token");
  cookie.remove("super_admin_blog_token");
};

export default clearLogin;
