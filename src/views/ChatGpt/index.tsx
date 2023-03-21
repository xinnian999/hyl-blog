import React, { useState } from "react";
import { Plate } from "@/components";
import {
  ChatWindowWrapper,
  MessagesWrapper,
  MessageBubble,
  InputWrapper,
  InputField,
  SendButton,
} from "./styled";
import { ajax } from "hyl-utils";

interface Message {
  text: string;
}

function ChatGpt() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleMessageSend = (): void => {
    if (newMessage.trim()) {
      ajax({
        method: "get",
        url: `/gpt?content=${newMessage}`,
        timeout: 500000,
      }).then((res) => {
        setMessages([
          ...messages,
          { text: newMessage },
          { text: res.response.content },
        ]);
      });

      setMessages([...messages, { text: newMessage }, { text: "ai思索中..." }]);
      setNewMessage("");
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
          <MessagesWrapper>
            {messages.map((message, index) => (
              <MessageBubble key={index} isUserMessage={index % 2 === 0}>
                {message.text}
              </MessageBubble>
            ))}
          </MessagesWrapper>
          <InputWrapper>
            <InputField
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
            />
            <SendButton onClick={handleMessageSend}>Send</SendButton>
          </InputWrapper>
        </ChatWindowWrapper>
      </Plate.Main>
    </Plate>
  );
}

export default ChatGpt;
