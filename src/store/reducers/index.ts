import { combineReducers } from "redux";
import set from "./set";
import login from "./login";
import chatgpt from "./chatgpt";

export default combineReducers({
  loginStore: login,
  setStore: set,
  chatgptStore: chatgpt,
});
