import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreTypes = {
  allMessages: any[];
};

const store = persist<StoreTypes>(
  (set) => ({
    //总消息数据
    allMessages: [],

    setAllMessages: (allMessages) => set({ allMessages }),
  }),
  { name: "chatgpt" }
);

export default create(store);
