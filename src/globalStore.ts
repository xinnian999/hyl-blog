import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreTypes = {
  theme: "light" | "dark";
  primaryColor: string;
  userInfo: {
    id: number;
    username: string;
    headPicture: string;
    email: string;
  };
  loginModal: boolean;
  loginState: boolean;
  loginType: "login" | "register" | "wx";
};

const store = persist<StoreTypes>(
  (set) => ({
    theme: "light",
    primaryColor: "#d6324d",
    userInfo: { id: 0, username: "昵称", headPicture: "", email: "" },
    loginModal: false,
    loginState: false,
    loginType: "login",
  }),
  {
    name: "global",
  }
);

export default create(store);
