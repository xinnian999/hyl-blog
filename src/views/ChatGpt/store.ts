import { create } from "zustand";
import { persist } from "zustand/middleware";
import { time } from "hyl-utils";

type msgType = {
  content: string;
  role: "user" | "assistant";
};

type DialogType = {
  time: string;
  messages: msgType[];
  current: boolean;
  id: string;
  top: boolean;
};

type StoreTypes = {
  dialogList: DialogType[];
  value: string;
  disabled: boolean;
  controller: AbortController;
  autoValue: string;
  createDialog: () => void;
  deleteDialog: (id: string) => void;
  updateDialog: (newItem: (item: DialogType) => any) => void;
};

const store = persist<StoreTypes, [], [], Pick<StoreTypes, "dialogList">>(
  (set) => ({
    //对话列表数据
    dialogList: [
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

    createDialog() {
      set((state) => {
        const newDialog = [
          {
            time: time.parse(new Date()),
            messages: [],
            current: true,
            id: Math.random() + "",
            top: true,
          },
          ...state.dialogList.map((item) => ({
            ...item,
            current: false,
            top: false,
          })),
        ];
        if (state.disabled) {
          state.controller.abort();
          return { dialogList: newDialog, disabled: false };
        }
        return { dialogList: newDialog };
      });
    },

    updateDialog(newItem) {
      set((state) => {
        const newDialog = state.dialogList.map((item) => ({
          ...item,
          ...newItem(item),
        }));
        return { dialogList: newDialog };
      });
    },

    deleteDialog(id) {
      set((state) => {
        const newDialog = state.dialogList.filter((item) => item.id !== id);
        if (newDialog.every((item) => !item.current)) {
          newDialog[0].current = true;
        }
        return { dialogList: newDialog };
      });
    },
  }),
  {
    name: "chatgpt",
    partialize: (state) => ({ dialogList: state.dialogList }),
  }
);

export default create(store);
