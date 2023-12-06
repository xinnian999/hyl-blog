import { Space } from "antd";
import styled from "styled-components";

export const ChatGptWrapper = styled.div`
  display: flex;
`;

export const ChatGptFullScreenWrapper = styled(ChatGptWrapper)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 999999;
  padding: 20px;
  overflow: hidden;
`;

export const ChatWrapper = styled.div`
  width: calc(100% - 280px - 50px);
  display: flex;
  flex-direction: column;
`;

export const HistoryWrapper = styled.div`
  width: 280px;
  background-color: #001529;
  text-align: center;
  padding-top: 20px;
  position: relative;
  .refresh {
    position: absolute;
    right: 10px;
    top: 25px;
  }
`;

export const ToolBarWrapper = styled(Space)`
  width: 50px;
  text-align: right;
`;

export const HistoryList = styled.ul`
  background-color: #001529;
  text-align: left;
  padding: 20px 10px 0;
  color: #fff;
  height: 68vh;
  overflow: auto;
  margin-top: 15px;
`;

export const LabelWrapper = styled.li<{ active: boolean }>`
  position: relative;
  line-height: 40px;
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.active ? "var(--ant-primary-color)" : "transparent"};

  .name {
    flex: 1;
    overflow: hidden;
    margin: 0 10px;
    margin-right: 0;
    white-space: nowrap;
    position: relative;
    .zhao {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 100%;

      background-image: linear-gradient(
        to left,
        var(--ant-primary-color),
        transparent
      );
    }
  }
  .action {
    width: 60px;
    display: flex;
    justify-content: space-around;
    position: relative;
    top: 1px;
    color: #eee;
  }
  .ico {
    font-size: 18px !important;
    &:hover {
      color: var(--ant-primary-4);
    }
  }
`;

export const InputWrapper = styled.div`
  padding: 10px;
  padding-bottom: 0;
  padding-right: 0;
  text-align: right;
  .sendBtn {
    margin-top: 5px;
    margin-left: 10px;
  }
`;

export const MessagesWrapper = styled.div<{ fullScreen: boolean }>`
  overflow-y: scroll;
  padding: 20px;

  ${(props) => (props.fullScreen ? "flex: 1;" : "height: 60vh;")}
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
