type dispatchTypes =
  | "CHANGE_LOGIN_STATE"
  | "CHANGE_USER_INFO"
  | "CHANGE_LOGIN_MODAL"
  | "CHANGE_LOGIN_TYPE"
  | "CHANGE_THEME"
  | "CHANGE_AUTOPLAY"
  | "CHANGE_SET_MODAL"
  | "CHANGE_DARK"
  | "CHANGE_SEARCH_DRAWER";

type loginReducerStateTypes = {
  loginState: boolean;
  userInfo: {
    id: number;
    username: string;
    headPicture: string;
    email: string;
  };
  loginModal: boolean;
  loginType: "login" | "register" | "wx";
};

type globalReducerStateTypes = {
  theme: { bg: number; color: string };
  autoplay: boolean | undefined;
  setModal: boolean;
  dark: boolean;
  searchDrawer: boolean;
};

interface storeTypes {
  loginStore: loginReducerStateTypes;
  setStore: globalReducerStateTypes;
}
