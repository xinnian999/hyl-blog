import React, { useEffect, useState } from "react";
import { Plate, Markdown } from "@/components";
import {
  ChatWindowWrapper,
  MessagesWrapper,
  MessageBubble,
  InputWrapper,
} from "./styled";
import { ajax } from "hyl-utils";
import { Avatar, Button, Input } from "antd";
import aiImg from "@/assets/img/avatar/ai.jpg";
import { UserOutlined } from "@ant-design/icons";
import { useRedux } from "@/hooks";

interface Message {
  content: string;
  role: string;
}

function ChatGpt() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { store } = useRedux();

  const { loginState, userInfo } = store;

  useEffect(() => {
    const MessagesDom = document.getElementById("MessagesWrapper")!;
    const InputDom = document.getElementById("MessagesInput")!;

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
    if (newMessage.trim()) {
      ajax({
        method: "post",
        url: `/gpt`,
        timeout: 500000,
        data: {
          messages: [...messages, { content: newMessage, role: "user" }],
        },
      }).then((res) => {
        setMessages([
          ...messages,
          { content: newMessage, role: "user" },
          res.response.data,
        ]);
      });

      setNewMessage("");
      setMessages([...messages, { content: newMessage, role: "user" }]);
      setTimeout(() => {
        setMessages([
          ...messages,
          { content: newMessage, role: "user" },
          { content: "ai思索中...", role: "assistant" },
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
      <ChatWindowWrapper>
        <MessagesWrapper id="MessagesWrapper">
          {messages.map((message, index) => (
            <MessageBubble key={index} isUserMessage={index % 2 === 0}>
              {index % 2 === 0 ? (
                <Avatar
                  icon={<UserOutlined />}
                  className="avatar"
                  size="large"
                  src={loginState ? userInfo.headPicture : ""}
                />
              ) : (
                <Avatar src={aiImg} className="avatar" size="large" />
              )}
              <div className="content">
                {index % 2 === 0 ? (
                  message.content
                ) : (
                  <Markdown content={message.content}></Markdown>
                )}
              </div>
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
    </Plate>
  );
}

export default ChatGpt;
