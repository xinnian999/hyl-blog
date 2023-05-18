const defaultState: loginReducerStateTypes = {
  loginState: false,
  userInfo: { id: 0, username: "昵称", headPicture: "", email: "" },
  loginModal: false,
  loginType: "login",
};

const loginReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case "CHANGE_LOGIN_STATE":
      return { ...state, loginState: payload };
    case "CHANGE_USER_INFO":
      return { ...state, userInfo: { ...state.userInfo, ...payload } };
    case "CHANGE_LOGIN_MODAL":
      return { ...state, loginModal: payload };
    case "CHANGE_LOGIN_TYPE":
      return { ...state, loginType: payload };
    default:
      return state;
  }
};

export default loginReducer;
