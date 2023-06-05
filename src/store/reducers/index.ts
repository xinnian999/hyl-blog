import { combineReducers } from "redux";
import set from "./set";
import login from "./login";

export default combineReducers({
  loginStore: login,
  setStore: set,
});
