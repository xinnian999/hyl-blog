import { Icon } from "@/components";
import { useRedux } from "@/hooks";
import { Avatar } from "antd";
import { time, httpTohttps } from "hyl-utils";
import { memo } from "react";
import "./style.scss";

function CommentCard({ avatar, author, datetime, content, children, reply }) {
  const { store } = useRedux();

  return (
    <div id="commentCard">
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

          {store.loginState && (
            <span className="commentCard-head-replyBtn" onClick={reply}>
              <Icon type="icon-shuoshuo" /> 回复
            </span>
          )}
        </div>
        <div className="commentCard-content">{content}</div>

        {children && children}
      </div>
    </div>
  );
}

export default memo(CommentCard);
