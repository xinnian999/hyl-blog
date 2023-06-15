const globalReducer = (
  state: globalReducerStateTypes = {
    theme: { bg: 0, color: "#d6324d" },
    autoplay: false,
    setModal: false,
    dark: false,
    searchDrawer: false,
  },
  { type, payload }
) => {
  switch (type) {
    case "CHANGE_THEME":
      return { ...state, theme: payload };
    case "CHANGE_AUTOPLAY":
      return { ...state, autoplay: payload };
    case "CHANGE_SET_MODAL":
      return { ...state, setModal: payload };
    case "CHANGE_DARK":
      return { ...state, dark: payload };
    case "CHANGE_SEARCH_DRAWER":
      return { ...state, searchDrawer: payload };
    default:
      return state;
  }
};

export default globalReducer;
