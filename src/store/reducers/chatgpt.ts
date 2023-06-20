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
  controller: new AbortController(),
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
    if (state.disabled) {
      state.controller.abort();
      return { ...state, allMessages: newMessages, disabled: false };
    }
    return { ...state, allMessages: newMessages };
  }

  if (
    type === "DELETE_MESSAGES" &&
    state.allMessages.length > 1 &&
    !state.disabled
  ) {
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
    if (state.disabled) {
      state.controller.abort();
      return { ...state, allMessages: sort, disabled: false };
    }
    return {
      ...state,
      allMessages: sort,
    };
  }

  if (type === "CHANGE_NAME") {
    const newMessages = [...state.allMessages];
    newMessages.forEach((item) => {
      if (item.key === payload.key) {
        item.time = payload.name;
      }
    });

    return { ...state, allMessages: newMessages };
  }

  if (type === "CHANGE_TOP") {
    const newMessages = state.allMessages.filter(
      (item) => item.key !== payload.key
    );
    payload.key = String(Number(newMessages[0].key) + 1);
    newMessages.unshift(payload);

    return { ...state, allMessages: newMessages };
  }

  if (type === "CHANGE_DISABLED") {
    return {
      ...state,
      disabled: payload,
    };
  }

  if (type === "CHANGE_CONTROLLER") {
    return {
      ...state,
      controller: payload,
    };
  }

  return state;
};

export default chatgptReducer;
