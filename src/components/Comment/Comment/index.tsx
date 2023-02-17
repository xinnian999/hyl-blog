import { Avatar, Space } from "antd";
import { time, httpTohttps } from "hyl-utils";
import "./style.scss";

function Comment({
  className,
  avatar,
  author,
  datetime,
  content,
  children,
  actions,
}) {
  return (
    <div id="comment" className={className}>
      <div className="commentCard">
        <div className="commentCard-head">
          <Avatar
            className="commentCard-head-avatar"
            src={httpTohttps(avatar)}
            size={40}
          />
          <div className="commentCard-head-name">{author}</div>
          <div className="commentCard-head-datetime">
            {time.parseFrom(datetime)}
          </div>
        </div>
        <div className="commentCard-content">{content}</div>

        <Space className="commentCard-footer">{actions}</Space>
      </div>
      {children && <div className="commentReply"> {children}</div>}
    </div>
  );
}

export default Comment;
