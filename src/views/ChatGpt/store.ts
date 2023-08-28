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
  autoScroll: boolean;
  createDialog: () => void;
  deleteDialog: (id: string) => void;
  updateDialog: (newItem: (item: DialogType) => any) => void;
};

const store = persist<StoreTypes, [], [], Pick<StoreTypes, "dialogList">>(
  (set, get) => ({
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
    autoScroll: true,

    createDialog() {
      const { dialogList, controller, disabled } = get();

      const newDialogList = [
        {
          time: time.parse(new Date()),
          messages: [],
          current: true,
          id: Math.random() + "",
          top: true,
        },
        ...dialogList.map((item) => ({
          ...item,
          current: false,
          top: false,
        })),
      ];
      if (disabled) {
        controller.abort();
        return set({ dialogList: newDialogList, disabled: false });
      }
      return set({ dialogList: newDialogList });
    },

    updateDialog(newItem) {
      set({
        dialogList: get().dialogList.map((item) => ({
          ...item,
          ...newItem(item),
        })),
      });
    },

    deleteDialog(id) {
      const newDialogList = get().dialogList.filter((item) => item.id !== id);
      if (newDialogList.every((item) => !item.current)) {
        newDialogList[0].current = true;
      }
      set({ dialogList: newDialogList });
    },
  }),
  {
    name: "chatgpt",
    partialize: (state) => ({ dialogList: state.dialogList }),
  }
);

export default create(store);
