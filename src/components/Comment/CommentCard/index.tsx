import { Icon } from "@/components";
import { useRootStore } from "@/hooks";
import { Avatar } from "antd";
import { time, httpTohttps } from "hyl-utils";
import { memo } from "react";
import "./style.scss";

interface CommentCardProps {
  avatar: string;
  author: React.ReactNode;
  datetime: string;
  content: string;
  children?: React.ReactNode;
  className?: string;
  reply?: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  avatar,
  author,
  datetime,
  content,
  children,
  reply,
  className,
}) => {
  const { loginState } = useRootStore();

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

          {loginState && (
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
};

export default memo(CommentCard);
