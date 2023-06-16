import styled from "styled-components";

export const ChatWindowWrapper = styled.div`
  display: flex;
`;

export const HistoryList = styled.div`
  width: 30%;
  background-color: #001529;
  text-align: center;
  padding-top: 20px;
  .menu {
    max-height: calc(70vh + 40px);
    margin-top: 20px;
    text-align: left;
    overflow: auto;
    .ant-menu-item {
      padding-inline: 0;
    }
  }
`;

export const Label = styled.div`
  position: relative;
  &:hover .action {
    display: block;
  }
  .action {
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 20px;
    display: none;
  }
  .icon {
    vertical-align: middle;
    font-size: 18px !important;
    &:hover {
      color: var(--ant-primary-color);
    }
  }
`;

export const MessagesWrapper = styled.div`
  overflow-y: scroll;
  padding: 20px;
  height: 70vh;
`;

export const MessageBubble = styled.div<{ isUserMessage: boolean }>`
  display: block;
  padding-left: 55px;
  position: relative;
  margin-bottom: 10px;
  .content {
    display: inline-block;
    max-width: 80%;
    margin-bottom: 10px;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: ${({ isUserMessage }) =>
      isUserMessage ? "var(--ant-primary-color)" : "#e6e6e6"};
    color: ${({ isUserMessage }) => (isUserMessage ? "#fff" : "#000")};
    align-self: ${({ isUserMessage }) =>
      isUserMessage ? "flex-end" : "flex-start"};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow-x: auto;
    ::before {
      position: absolute;
      left: -19px;
      top: 6px;
      height: 0;
      width: 0;
      content: "";
      border: 10px solid rgba(255, 255, 255, 0);
      border-top: 6px solid rgba(255, 255, 255, 0);
      border-bottom: 6px solid rgba(255, 255, 255, 0);
      border-right-color: ${({ isUserMessage }) =>
        isUserMessage ? "var(--ant-primary-color)" : "#e6e6e6"};
    }

    .userContent {
      white-space: pre-wrap;
    }
  }
  .avatar {
    position: absolute;
    left: 0;
    border: 1px solid #eee;
  }
`;

export const InputWrapper = styled.div`
  padding: 10px;
  text-align: right;
  .sendBtn {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

export const InputField = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
`;
