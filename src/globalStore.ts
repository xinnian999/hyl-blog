import { create } from "zustand";
import { persist } from "zustand/middleware";

type messagesItem = {
  content: string;
  role: "user" | "assistant";
};

type messagesGroup = {
  time: string;
  messages: messagesItem[];
  current: boolean;
  id: string;
  top: boolean;
};

type StoreTypes = {
  allMessages: messagesGroup[];
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
