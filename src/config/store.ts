import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type isStore = {
  loginState: boolean;
  theme: { bg: number; color: string };
  userInfo: {
    id: number;
    username: string;
    headPicture: string;
    email: string | null;
  };
  autoplay: boolean | undefined;
  loginModal: boolean;
  setModal: boolean;
  dark: boolean;
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
    theme: { bg: 0, color: "#d6324d" },
    userInfo: { id: 0, username: "昵称", headPicture: "", email: null },
    autoplay: true,
    loginModal: false,
    setModal: false,
    dark: false,
  },
  { type, payload }
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
    case "CHANGE_LOGIN_MODAL":
      return { ...state, loginModal: payload };
    case "CHANGE_SET_MODAL":
      return { ...state, setModal: payload };
    case "CHANGE_DARK":
      return { ...state, dark: payload };
    default:
      return state;
  }
};

const myPersistReducer = persistReducer(persistConfig, reducer);

const store = createStore(myPersistReducer);

const persistor = persistStore(store);

export { store, persistor };
