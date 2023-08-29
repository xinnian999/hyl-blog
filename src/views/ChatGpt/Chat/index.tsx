import { useEffect, useRef } from "react";
import { MessagesWrapper, InputWrapper, ChatWrapper } from "../styled";
import { Button, Input } from "antd";
import Bubble from "./Bubble";
import { useBoolean, useMount } from "@/hooks";
import { sendApi } from "./api";
import useStore from "../store";
import { url } from "hyl-utils";

const { setState } = useStore;

const tip = `
  您好，我是chatgpt。\n
  我是一种由OpenAI训练的大型语言模型。我的原理是基于Transformer架构，通过预训练大量文本数据来学习如何生成人类可读的文本，然后通过接受输入并生成输出来实现对话。\n
  我的用途非常广泛，可以用于自然语言处理（NLP）任务，如对话生成、问答系统、文本生成、写代码等。
`;

function ChatGpt() {
  const messages = useStore(
    (state) => state.dialogList.find((item) => item.current)!.messages
  );
  const {
    value,
    disabled,
    controller,
    autoValue,
    autoScroll,
    updateDialog,
    createDialog,
    fullScreen,
  } = useStore();

  const [visible, onVisible] = useBoolean(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const setMessages = (msg) => {
    updateDialog((item) => ({
      messages: item.current ? msg : item.messages,
    }));
  };

  useMount(() => {
    const params = url.getParams();
    if (params.q) {
      setState({ autoValue: params.q });
      createDialog();
    }

    onVisible();

    return () => setState({ autoValue: "" });
  });

  const goEnd = () => {
    const element = wrapperRef.current!;
    const { scrollHeight, clientHeight } = element;
    element.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: "smooth", // 平滑滚动
    });
  };

  useEffect(() => {
    if (autoScroll) {
      goEnd();
    }
  }, [messages, visible]);

  useEffect(() => {
    if (autoValue) {
      handleMessageSend(autoValue);
    }
  }, [autoValue]);

  const handleMessageSend = (msg = value): void => {
    const newController = new AbortController();

    if (msg.trim()) {
      setState({ disabled: true, controller: newController, value: "" });
      setMessages([...messages, { content: msg, role: "user" }]);

      setTimeout(() => {
        setMessages([
          ...messages,
          { content: msg, role: "user" },
          { content: "ai思索中...", role: "assistant" },
        ]);
      }, 700);

      sendApi(
        {
          messages: [...messages, { content: msg, role: "user" }],
        },
        newController
      ).then(async (response) => {
        //获取UTF8的解码
        const encode = new TextDecoder("utf-8");
        //获取body的reader
        const reader = response.body!.getReader();

        let contents = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            setState({ disabled: false });
            break;
          }
          // 解码内容
          const text = encode.decode(value);

          //切成消息数组，并过滤掉空数据
          const datas = text.split("data: ").filter((item) => item);

          // 遍历消息
          datas.forEach((item) => {
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
            { content: msg, role: "user" },
            { content: contents, role: "assistant" },
          ]);
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      setState({ value: value + "\n" });
    }
    if (e.keyCode === 13) {
      return handleMessageSend();
    }
  };

  return (
    <ChatWrapper>
      <MessagesWrapper
        fullScreen={fullScreen}
        id="MessagesWrapper"
        ref={wrapperRef}
      >
        <Bubble isUser={false} content={tip} />
        {visible &&
          messages.map((message, index) => (
            <Bubble
              key={message.content + index}
              isUser={index % 2 === 0}
              content={message.content}
            />
          ))}
      </MessagesWrapper>

      <InputWrapper>
        <Input.TextArea
          value={value}
          disabled={disabled}
          onChange={(e) => setState({ value: e.target.value })}
          placeholder="你想对Ai说什么？（支持回车发送，ctrl+回车换行）"
          autoSize={{ minRows: 3, maxRows: 6 }}
          onKeyDown={handleKeyDown}
        />
        {disabled && (
          <Button
            className="sendBtn"
            type="primary"
            onClick={() => {
              controller.abort();
              setState({ disabled: false });
            }}
          >
            终止
          </Button>
        )}
        <Button
          className="sendBtn"
          type="primary"
          disabled={disabled}
          onClick={() => handleMessageSend()}
        >
          发送
        </Button>
      </InputWrapper>
    </ChatWrapper>
  );
}

export default ChatGpt;
