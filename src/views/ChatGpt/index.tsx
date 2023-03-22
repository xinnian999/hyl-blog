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
}

function ChatGpt() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const element = document.getElementById("MessagesWrapper")!;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    element.style.transition = "scroll 500ms ease-in-out"; // 添加过渡效果
    element.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: "smooth", // 平滑滚动
    });
  }, [messages]);

  const handleMessageSend = (): void => {
    let content = [...messages, { text: newMessage }].reduce((str, item) => {
      return str + item.text;
    }, "");
    if (content.length > 3800) {
      content = content.substr(-3800);
    }
    console.log(content.length);

    if (newMessage.trim()) {
      ajax({
        method: "post",
        url: `/gpt`,
        timeout: 500000,
        data: {
          content,
        },
      }).then((res) => {
        setMessages([
          ...messages,
          { text: newMessage },
          { text: res.response.content },
        ]);
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
          <InputWrapper>
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
