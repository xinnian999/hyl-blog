import { Divider, List, Alert } from "antd";
import { useGetData, useRedux } from "@/hooks";
import Reply from "./Reply";
import Editor from "./Editor";
import "./style.scss";

interface CommentType {
  articleId: string;
  title?: string;
  btnName: string;
  hasAnimation?: boolean;
  className?: string;
}

interface CommentData {
  id: number;
  reply_id: number;
}

function Comment({
  articleId,
  title,
  btnName,
  hasAnimation,
  className,
}: CommentType) {
  const [commentData, run] = useGetData<CommentData>("/comment/query", {
    data: {
      articleId,
      filters: { article_id: articleId },
      orderBys: "id desc",
    },
  });

  const { store, dispatch } = useRedux();

  const currentCommentData = commentData.filter((item) => !item.reply_id);

  const commentItem = (props: CommentData) => {
    const replyData = commentData
      .filter((item) => {
        return item.reply_id === props.id;
      })
      .reverse();

    return (
      <Reply
        commentItem={props}
        refresh={run}
        replyData={replyData}
        hasAnimation={hasAnimation}
      />
    );
  };

  return (
    <div id="comment" className={className}>
      {title && <Divider>{title}</Divider>}
      {store.loginState ? (
        <Editor
          btnName={btnName}
          articleId={articleId}
          refresh={run}
          hasAnimation={hasAnimation}
        />
      ) : (
        <Alert
          message={
            <>
              <span
                className="commentLoginBtn"
                onClick={() =>
                  dispatch({ type: "CHANGE_LOGIN_MODAL", payload: true })
                }
              >
                登录
              </span>{" "}
              后可发表评论
            </>
          }
          type="info"
          showIcon
        />
      )}
      <List
        dataSource={currentCommentData}
        header={
          <span className="total">{`${currentCommentData.length}条${
            articleId === "99999" ? "留言" : "评论"
          }`}</span>
        }
        itemLayout="horizontal"
        className="commentCon"
        renderItem={commentItem}
        locale={{ emptyText: "暂无评论，快发表第一个热评！" }}
        loading={!commentData.length && articleId === "99999"}
      />
    </div>
  );
}

export default Comment;
