type dispatchTypes =
  | "CHANGE_LOGIN_STATE"
  | "CHANGE_USER_INFO"
  | "CHANGE_LOGIN_MODAL"
  | "CHANGE_LOGIN_TYPE"
  | "CHANGE_THEME"
  | "CHANGE_AUTOPLAY"
  | "CHANGE_SET_MODAL"
  | "CHANGE_DARK"
  | "CHANGE_SEARCH_DRAWER"
  | "CHANGE_MESSAGES"
  | "ADD_MESSAGES"
  | "DELETE_MESSAGES"
  | "CHANGE_MESSAGES_CURRENT"
  | "CHANGE_DISABLED";

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

type messagesItem = {
  content: string;
  role: "user" | "assistant";
};

type messagesGroup = {
  time: string;
  messages: messagesItem[];
  current: boolean;
  key: string;
};

type chatgptReducerStateTypes = {
  allMessages: messagesGroup[];
  disabled: boolean;
};

interface storeTypes {
  loginStore: loginReducerStateTypes;
  setStore: globalReducerStateTypes;
  chatgptStore: chatgptReducerStateTypes;
}
