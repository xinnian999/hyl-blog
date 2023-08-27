import { Divider, List, Alert } from "antd";
import { useGetData, useRootStore } from "@/hooks";
import Reply from "./Reply";
import Editor from "./Editor";
import "./style.scss";

interface CommentProps {
  articleId: string;
  title?: string;
  btnName: string;
  className?: string;
}

function Comment(props: CommentProps) {
  const { articleId, title, btnName, className } = props;

  const [commentData, run] = useGetData<CommentData>("/comment/query", {
    data: {
      articleId,
      filters: { article_id: articleId },
      orderBys: "id desc",
    },
  });

  const { loginState, setRootState } = useRootStore();

  const currentCommentData = commentData.filter((item) => !item.reply_id);

  const commentItem = (props: CommentData) => {
    const replyData = commentData
      .filter((item) => {
        return item.reply_id === props.id;
      })
      .reverse();

    return <Reply commentItem={props} refresh={run} replyData={replyData} />;
  };

  return (
    <div id="comment" className={className}>
      {title && <Divider>{title}</Divider>}
      {loginState ? (
        <Editor btnName={btnName} articleId={articleId} refresh={run} />
      ) : (
        <Alert
          message={
            <>
              <span
                className="commentLoginBtn"
                onClick={() => setRootState({ loginModal: true })}
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
