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
      <Avatar
        className="commentCard-avatar"
        src={httpTohttps(avatar)}
        size={40}
      />
      <div className="commentCard">
        <div className="commentCard-head">
          <div className="commentCard-head-name">{author}</div>
          <div className="commentCard-head-datetime">
            {time.parseFrom(datetime)}
          </div>
        </div>
        <div className="commentCard-content">{content}</div>

        <Space className="commentCard-footer">{actions}</Space>
        {/* {children && <div className="commentReply"> {children}</div>} */}
        {children && children}
      </div>
    </div>
  );
}

export default Comment;
