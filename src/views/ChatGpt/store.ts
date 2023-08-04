import { create } from "zustand";
import { persist } from "zustand/middleware";
import { time } from "hyl-utils";

type messagesItem = {
  content: string;
  role: "user" | "assistant";
};

type DialogType = {
  time: string;
  messages: messagesItem[];
  current: boolean;
  id: string;
  top: boolean;
};

type StoreTypes = {
  allMessages: DialogType[];
  value: string;
  disabled: boolean;
  controller: AbortController;
  autoValue: string;
  createMessages: () => void;
  deleteMessages: (id: string) => void;
  updateAllMessages: (newItem: (item: DialogType) => any) => void;
};

const store = persist<StoreTypes, [], [], Pick<StoreTypes, "allMessages">>(
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
  {
    name: "chatgpt",
    partialize: (state) => ({ allMessages: state.allMessages }),
  }
);

export default create(store);
