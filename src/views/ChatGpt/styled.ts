import styled from "styled-components";

export const ChatWindowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MessagesWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
`;

export const MessageBubble = styled.pre<{ isUserMessage: boolean }>`
  display: block;
  max-width: 70%;
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 15px;
  background-color: ${({ isUserMessage }) =>
    isUserMessage ? "#00c2ff" : "#e6e6e6"};
  color: ${({ isUserMessage }) => (isUserMessage ? "#fff" : "#000")};
  align-self: ${({ isUserMessage }) =>
    isUserMessage ? "flex-end" : "flex-start"};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border: 1px solid #ccc;
  overflow: auto;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f7f7f7;
`;

export const InputField = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
`;

export const SendButton = styled.button`
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #00c2ff;
  color: #fff;
  font-size: 16px;
`;
