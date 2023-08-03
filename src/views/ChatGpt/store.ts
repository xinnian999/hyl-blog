import { create } from "zustand";
import { persist } from "zustand/middleware";
import { time, url } from "hyl-utils";

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
  value: string;
  disabled: boolean;
  controller: AbortController;
  autoValue: string;
  setController: (controller: AbortController) => any;
  setDisabled: (disabled: boolean) => any;
  setValue: (value: string) => any;
  setAutoValue: (autoValue: string) => any;
  createMessages: () => void;
  deleteMessages: (id: string) => void;
  updateAllMessages: (newItem: (item: messagesGroup) => any) => void;
};

const store = persist<StoreTypes>(
  (set) => ({
    //总消息数据
    allMessages: [
      {
        time: time.parse(new Date()),
        messages: [],
        current: true,
        id: "first",
        top: true,
      },
    ],
    //输入框值
    value: "",
    //输入框禁用
    disabled: false,
    //取消请求的实例
    controller: new AbortController(),
    //自动发送的消息
    autoValue: "",

    setController: (controller) => set({ controller }),
    setValue: (value) => set({ value }),
    setDisabled: (disabled) => set({ disabled }),
    setAutoValue: (autoValue) => set({ autoValue }),

    createMessages() {
      set((state) => {
        const newMessages = [
          {
            time: time.parse(new Date()),
            messages: [],
            current: true,
            id: Math.random() + "",
            top: true,
          },
          ...state.allMessages.map((item) => ({
            ...item,
            current: false,
            top: false,
          })),
        ];
        if (state.disabled) {
          state.controller.abort();
          return { allMessages: newMessages, disabled: false };
        }
        return { allMessages: newMessages };
      });
    },

    updateAllMessages(newItem) {
      set((state) => {
        const newMessages = state.allMessages.map((item) => ({
          ...item,
          ...newItem(item),
        }));
        return { allMessages: newMessages };
      });
    },

    deleteMessages(id) {
      set((state) => {
        const newMessages = state.allMessages.filter((item) => item.id !== id);
        if (newMessages.every((item) => !item.current)) {
          newMessages[0].current = true;
        }
        return { allMessages: newMessages };
      });
    },
  }),
  { name: "chatgpt" }
);

export default create(store);
