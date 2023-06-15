import { time } from "hyl-utils";

const defaultState: chatgptReducerStateTypes = {
  allMessages: [
    {
      time: time.parse(new Date()),
      messages: [],
      current: true,
      key: "1",
    },
  ],
  disabled: false,
};

const chatgptReducer = (state = defaultState, { type, payload }) => {
  if (type === "CHANGE_MESSAGES") {
    const newMessages = [...state.allMessages];
    newMessages.forEach((item) => {
      if (item.current) {
        item.messages = payload;
      }
    });

    return { ...state, allMessages: newMessages };
  }

  if (type === "ADD_MESSAGES") {
    const index = Number(state.allMessages[0].key) + 1;
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

    return { ...state, allMessages: newMessages };
  }

  if (type === "DELETE_MESSAGES" && state.allMessages.length > 1) {
    const newMessages = state.allMessages.filter(
      (item) => item.key !== payload
    );
    if (newMessages.every((item) => !item.current)) {
      newMessages[0].current = true;
    }

    return {
      ...state,
      allMessages: newMessages,
    };
  }

  if (type === "CHANGE_MESSAGES_CURRENT") {
    const changeCurrent = state.allMessages.map((item) => ({
      ...item,
      current: item.key === payload,
    }));

    const sort = changeCurrent.sort((a, b) => Number(b.key) - Number(a.key));

    return {
      ...state,
      allMessages: sort,
    };
  }

  if (type === "CHANGE_DISABLED") {
    return {
      ...state,
      disabled: payload,
    };
  }

  return state;
};

export default chatgptReducer;
