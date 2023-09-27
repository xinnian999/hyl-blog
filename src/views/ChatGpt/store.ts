import { sendApi } from '@/views/ChatGpt/Chat/api';
import { time } from 'hyl-utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type msgType = {
  content: string;
  role: 'user' | 'assistant';
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
  fullScreen: boolean;
  createDialog: () => void;
  deleteDialog: (id: string) => void;
  updateDialog: (newItem: (item: DialogType) => any) => void;
  setMessages: (msgs: msgType[]) => void;
  sendMessage: (msg?: string) => void;
};

const store = persist<StoreTypes, [], [], Pick<StoreTypes, 'dialogList'>>(
  (set, get) => ({
    //对话列表数据
    dialogList: [
      {
        time: time.parse(new Date()),
        messages: [],
        current: true,
        id: 'first',
        top: true,
      },
    ],
    //输入框值
    value: '',
    //输入框禁用
    disabled: false,
    //取消请求的实例
    controller: new AbortController(),
    //自动发送的消息
    autoValue: '',
    autoScroll: true,
    fullScreen: false,

    createDialog() {
      const { dialogList, controller, disabled } = get();

      const newDialogList = [
        {
          time: time.parse(new Date()),
          messages: [],
          current: true,
          id: `${Math.random()}`,
          top: true,
        },
        ...dialogList.map(item => ({
          ...item,
          current: false,
          top: false,
        })),
      ];
      if (disabled) {
        //如果正在接收流，切断
        controller.abort();
        return set({ dialogList: newDialogList, disabled: false });
      }
      return set({ dialogList: newDialogList });
    },

    updateDialog(newItem) {
      set({
        dialogList: get().dialogList.map(item => ({
          ...item,
          ...newItem(item),
        })),
      });
    },

    deleteDialog(id) {
      const newDialogList = get().dialogList.filter(item => item.id !== id);
      if (newDialogList.every(item => !item.current)) {
        newDialogList[0].current = true;
      }
      set({ dialogList: newDialogList });
    },

    setMessages(msgs) {
      get().updateDialog(item => ({
        messages: item.current ? msgs : item.messages,
      }));
    },

    sendMessage(msg = get().value) {
      if (!msg.trim()) return;
      const { setMessages, dialogList } = get();
      const { messages } = dialogList.find(item => item.current)!;
      const newController = new AbortController();

      set({ disabled: true, controller: newController });

      setMessages([...messages, { content: msg, role: 'user' }]);

      setTimeout(() => {
        setMessages([
          ...messages,
          { content: msg, role: 'user' },
          { content: 'ai思索中...', role: 'assistant' },
        ]);
      }, 700);

      sendApi(
        {
          messages: [...messages, { content: msg, role: 'user' }],
        },
        newController
      ).then(async ({ status, body }) => {
        if (status === 200) {
          //获取UTF8的解码
          const encode = new TextDecoder('utf-8');
          //获取body的reader
          const reader = body!.getReader();

          let contents = '';

          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              set({ disabled: false, value: '' });

              break;
            }
            // 解码内容
            const text = encode.decode(value);

            //切成消息数组，并过滤掉空数据
            const datas = text.split('data: ').filter(item => item);

            // 遍历消息
            datas.forEach(item => {
              try {
                const c = JSON.parse(item);

                if (c.choices[0].delta.content) {
                  contents += c.choices[0].delta.content;
                }
              } catch (e) {
                // console.log([e, item, text, texts]);
              }
            });

            setMessages([
              ...messages,
              { content: msg, role: 'user' },
              { content: contents, role: 'assistant' },
            ]);
          }
        } else {
          setMessages([
            ...messages,
            { content: msg, role: 'user' },
            { content: '', role: 'assistant' },
          ]);
          set({ disabled: false });
        }
      });
    },
  }),
  {
    name: 'chatgpt',
    partialize: state => ({ dialogList: state.dialogList }),
  }
);

export default create(store);
