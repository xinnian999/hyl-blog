import { time } from "hyl-utils";

const defaultState: chatgptReducerStateTypes = {
  allMessages: [
    { time: time.parse(new Date()), messages: [], current: true, id: 1 },
  ],
};

const chatgptReducer = (state = defaultState, { type, payload }) => {
  if (type === "CHANGE_MESSAGES") {
    const oldMessages = [...state.allMessages];
    oldMessages.forEach((item) => {
      if (item.current) {
        item.messages = payload;
      }
    });

    return { ...state, allMessages: oldMessages };
  }

  if (type === "ADD_MESSAGES") {
    const clearCurrent = state.allMessages.map((item) => ({
      ...item,
      current: false,
    }));
    const newMessages = [
      {
        time: time.parse(new Date()),
        messages: [],
        current: true,
        id: clearCurrent.length + 1,
      },
      ...clearCurrent,
    ];

    return { ...state, allMessages: newMessages };
  }

  if (type === "DELETE_MESSAGES" && state.allMessages.length > 1) {
    const newMessages = state.allMessages.filter(
      (item) => item.time !== payload
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
      current: item.time === payload,
    }));

    const sort = changeCurrent.sort((a, b) => b.id - a.id);

    return {
      ...state,
      allMessages: sort,
    };
  }

  return state;
};

export default chatgptReducer;
