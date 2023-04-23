import { Avatar } from "antd";
import { Markdown } from "@/components";
import aiImg from "@/assets/img/avatar/ai.jpg";
import { UserOutlined } from "@ant-design/icons";
import { useRedux } from "@/hooks";
import { MessageBubble } from "../styled";

function Bubble({ isUser, content }) {
  const { store } = useRedux();

  const { loginState, userInfo } = store;
  return (
    <MessageBubble isUserMessage={isUser}>
      {isUser ? (
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
        {isUser ? (
          <div className="userContent">{content}</div>
        ) : (
          <Markdown content={content}></Markdown>
        )}
      </div>
    </MessageBubble>
  );
}

export default Bubble;
