type loginReducerProps = {
  loginState: boolean;
  userInfo: {
    id: number;
    username: string;
    headPicture: string;
    email: string;
  };
  loginModal: boolean;
};

const loginReducer = (
  state: loginReducerProps = {
    loginState: false,
    userInfo: { id: 0, username: "昵称", headPicture: "", email: "" },
    loginModal: false,
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

export default loginReducer;
