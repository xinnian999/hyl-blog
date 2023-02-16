import { Avatar, Space } from "antd";
import "./style.scss";

function Comment({ avatar, author, datetime, content, children, actions }) {
  return (
    <>
      <div className="commentCard">
        <div className="commentCard-head">
          <Avatar className="commentCard-head-avatar" src={avatar} size={40} />
          <div className="commentCard-head-name">{author}</div>
        </div>
        <div className="commentCard-content">{content}</div>
        <div className="commentCard-head-datetime">{datetime} </div>

        <Space className="commentCard-footer" direction="vertical">
          {actions}
        </Space>
      </div>
      {children && <div className="commentReply"> {children}</div>}
    </>
  );
}

export default Comment;
