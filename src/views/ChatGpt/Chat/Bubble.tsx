import { Avatar } from "antd";
import { Markdown } from "@/components";
import aiImg from "@/assets/img/avatar/ai.jpg";
import { UserOutlined } from "@ant-design/icons";
import { MessageBubble } from "../styled";

function Bubble({ isUser, content }) {
  return (
    <MessageBubble isUserMessage={isUser}>
      {isUser ? (
        <Avatar icon={<UserOutlined />} className="avatar" size="large" />
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
