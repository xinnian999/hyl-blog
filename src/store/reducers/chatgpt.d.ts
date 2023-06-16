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

type chatgptReducerStateTypes = {
  allMessages: messagesGroup[];
  disabled: boolean;
  controller: AbortController;
};
