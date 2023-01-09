import { store } from "@/store";
import  request  from "./request";
import cookie from "js-cookie";

const clearLogin = () => {
  request.post('/qq/clearLoginInfo').then(res=>{
    if(res){
      store.dispatch({ type: "CHANGE_LOGIN_STATE", payload: false });
      cookie.remove("blog_token");
    }
  })

};

export default clearLogin;
