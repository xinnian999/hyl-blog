import { combineReducers } from "redux";
import globalSetting from "./globalSetting";
import login from "./login";

export default combineReducers({
  loginStore: login,
  globalStore: globalSetting,
});
