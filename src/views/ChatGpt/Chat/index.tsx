import { useEffect, useState } from "react";
import { MessagesWrapper, InputWrapper } from "../styled";
import { Button, Input } from "antd";
import Bubble from "./Bubble";
import { useBoolean } from "@/hooks";

interface Message {
  content: string;
  role: "user" | "assistant";
}

const tip = `
  您好，我是chatgpt。\n
  我是一种由OpenAI训练的大型语言模型。我的原理是基于Transformer架构，通过预训练大量文本数据来学习如何生成人类可读的文本，然后通过接受输入并生成输出来实现对话。\n
  我的用途非常广泛，可以用于自然语言处理（NLP）任务，如对话生成、问答系统、文本生成、写代码等。
`;

const controller = new AbortController();

function ChatGpt() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const [disabled, on, off] = useBoolean(false);

  useEffect(() => {
    const MessagesDom = document.getElementById("MessagesWrapper")!;

    MessagesDom.scrollTo({
      top: MessagesDom.scrollHeight - MessagesDom.clientHeight,
      behavior: "smooth", // 平滑滚动
    });
  }, [messages]);

  const handleMessageSend = (): void => {
    if (newMessage.trim()) {
      on();
      setNewMessage("");
      setMessages([...messages, { content: newMessage, role: "user" }]);
      setTimeout(() => {
        setMessages([
          ...messages,
          { content: newMessage, role: "user" },
          { content: "ai思索中...", role: "assistant" },
        ]);
      }, 700);

      fetch("/api/all/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, { content: newMessage, role: "user" }],
        }),
      }).then(async (response) => {
        //获取UTF8的解码
        const encode = new TextDecoder("utf-8");
        //获取body的reader
        const reader = response.body!.getReader();

        let contents = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            off();
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
            { content: newMessage, role: "user" },
            { content: contents, role: "assistant" },
          ]);
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      return setNewMessage(newMessage + "\n");
    }
    if (e.keyCode === 13) {
      return handleMessageSend();
    }
  };

  return (
    <>
      <MessagesWrapper id="MessagesWrapper">
        <Bubble isUser={false} content={tip} />
        {messages.map((message, index) => (
          <Bubble
            key={message.content}
            isUser={index % 2 === 0}
            content={message.content}
          />
        ))}
      </MessagesWrapper>

      <InputWrapper>
        <Input.TextArea
          value={newMessage}
          disabled={disabled}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="你想对Ai说什么？（支持回车发送，ctrl+回车换行）"
          autoSize={{ minRows: 4, maxRows: 999 }}
          onKeyDown={handleKeyDown}
        />
        {/* {disabled && (
          <Button
            className="sendBtn"
            type="primary"
            onClick={() => {
              controller.abort();
              off();
            }}
          >
            终止
          </Button>
        )} */}
        <Button
          className="sendBtn"
          type="primary"
          disabled={disabled}
          onClick={handleMessageSend}
        >
          发送
        </Button>
      </InputWrapper>
    </>
  );
}

export default ChatGpt;
