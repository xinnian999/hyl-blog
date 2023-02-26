import { Icon } from "@/components";
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
  reply,
}) {
  return (
    <div id="commentCard" className={className}>
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

          <span className="commentCard-head-replyBtn" onClick={reply}>
            <Icon type="icon-shuoshuo" /> 回复
          </span>
        </div>
        <div className="commentCard-content">{content}</div>

        {children && children}
      </div>
    </div>
  );
}

export default Comment;
