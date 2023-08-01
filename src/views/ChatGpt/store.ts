import { create } from "zustand";
import { time } from "hyl-utils";

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

type chatgptStoreTypes = {
  allMessages: messagesGroup[];
  disabled: boolean;
  controller: AbortController;
  setAllMessages: (newMsg: messagesItem[]) => any;
  setController: (controller: AbortController) => any;
  setDisabled: (disabled: boolean) => any;
  createMessages: () => void;
};

const useStore = create<chatgptStoreTypes>((set) => ({
  //总消息数据
  allMessages: [
    {
      time: time.parse(new Date()),
      messages: [],
      current: true,
      key: "1",
    },
  ],
  //输入框禁用
  disabled: false,
  //取消请求的实例
  controller: new AbortController(),

  setAllMessages: (newMsg) => {
    set((state) => {
      const newMessages = state.allMessages.map((item) => {
        if (item.current) {
          return {
            ...item,
            messages: newMsg,
          };
        }
        return item;
      });
      return { allMessages: newMessages };
    });
  },
  setController: (controller) => set({ controller }),
  setDisabled: (disabled) => set({ disabled }),

  createMessages: () => {
    set((state) => {
      const index = +state.allMessages[0].key + 1;
      const newMessages = [
        {
          time: time.parse(new Date()),
          messages: [],
          current: true,
          key: String(index),
        },
        ...state.allMessages.map((item) => ({
          ...item,
          current: false,
        })),
      ];
      if (state.disabled) {
        state.controller.abort();
        return { ...state, allMessages: newMessages, disabled: false };
      }
      return { ...state, allMessages: newMessages };
    });
  },
}));

export default useStore;
