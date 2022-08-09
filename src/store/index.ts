import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type isStore = {
  loginState: boolean;
  theme: { bg: string; color: string };
  userInfo: { id: number; username: string; headPicture: string };
  autoplay: boolean | undefined;
};

//在localStorge中生成key为root的值
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loading"], //设置某个reducer数据不持久化，
};

const reducer = (
  state: isStore = {
    loginState: false,
    theme: { bg: "bg3.jpeg", color: "#25b864" },
    userInfo: { id: 0, username: "昵称", headPicture: "" },
    autoplay: undefined,
  },
  { type, payload }: any
) => {
  switch (type) {
    case "CHANGE_LOGIN_STATE":
      return { ...state, loginState: payload };
    case "CHANGE_THEME":
      return { ...state, theme: payload };
    case "CHANGE_USER_INFO":
      return { ...state, userInfo: { ...state.userInfo, ...payload } };
    case "CHANGE_AUTOPLAY":
      return { ...state, autoplay: payload };
    default:
      return state;
  }
};

const myPersistReducer = persistReducer(persistConfig, reducer);

const store = createStore(myPersistReducer);

const persistor = persistStore(store);

export { store, persistor };
