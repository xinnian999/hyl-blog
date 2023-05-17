import { combineReducers } from "redux";
import global from "./global";
import login from "./login";

export default combineReducers({
  login,
  global,
});
