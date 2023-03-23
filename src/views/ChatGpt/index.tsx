import React, { useEffect, useState } from "react";
import { Plate, Markdown } from "@/components";
import {
  ChatWindowWrapper,
  MessagesWrapper,
  MessageBubble,
  InputWrapper,
  InputField,
} from "./styled";
import { ajax } from "hyl-utils";
import { Button, Input } from "antd";

interface Message {
  text: string;
  id?: string;
}

function ChatGpt() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const MessagesDom = document.getElementById("MessagesWrapper")!;
    const InputDom = document.getElementById("MessagesInput")!;

    MessagesDom.style.transition = "scroll 500ms ease-in-out"; // 添加过渡效果
    MessagesDom.scrollTo({
      top: MessagesDom.scrollHeight - MessagesDom.clientHeight,
      behavior: "smooth", // 平滑滚动
    });

    const rect = InputDom.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      InputDom.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleMessageSend = (): void => {
    // let content = [...messagesData, { text: newMessage }].reduce(
    //   (str, item, index) => {
    //     // if (index % 2 === 0) return str + `(You:${item.text}\n)`;
    //     return str + item.text;
    //   },
    //   ""
    // );
    // if (content.length > 3800) {
    //   content = content.substr(-3800);
    // }
    // console.log(content.length);

    if (newMessage.trim()) {
      ajax({
        method: "post",
        url: `/gpt`,
        timeout: 500000,
        data: {
          content: newMessage,
          id: messages.length ? messages[messages.length - 1].id : "",
        },
      })
        .then((res) => {
          const { content, id } = res.response;
          setMessages([
            ...messages,
            { text: newMessage },
            { text: content, id },
          ]);

          setMessagesData([
            ...messagesData,
            { text: newMessage },
            { text: content },
          ]);
        })
        .catch(() => {
          setMessages([
            ...messages,
            { text: newMessage },
            { text: "对不起，ai网络故障，请重新提问" },
          ]);

          setMessagesData([]);
        });

      setNewMessage("");
      setMessages([...messages, { text: newMessage }]);
      setTimeout(() => {
        setMessages([
          ...messages,
          { text: newMessage },
          { text: "ai思索中..." },
        ]);
      }, 700);
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  return (
    <Plate title="ChatGPT" autograph="最新人工智能 ~ 在线体验">
      <Plate.Main style={{ width: "1000px" }}>
        <ChatWindowWrapper>
          <MessagesWrapper id="MessagesWrapper">
            {messages.map((message, index) => (
              <MessageBubble key={index} isUserMessage={index % 2 === 0}>
                <Markdown content={message.text}></Markdown>
              </MessageBubble>
            ))}
          </MessagesWrapper>
          <InputWrapper id="MessagesInput">
            <Input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="你想对Ai说什么？"
            />
            <Button type="primary" onClick={handleMessageSend}>
              发送
            </Button>
          </InputWrapper>
        </ChatWindowWrapper>
      </Plate.Main>
    </Plate>
  );
}

export default ChatGpt;
