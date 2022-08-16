import { useSelector } from "react-redux";
import { Divider, List, Alert } from "antd";
import { useSetState, useMount } from "@/hooks";
import { request } from "@/utils";
import Reply from "./Reply";
import Editor from "./Editor";
import "./style.scss";

interface comment {
  articleId: any;
  title?: string;
  btnName: string;
  hasAnimation?: boolean;
}

function Index({ articleId, title, btnName, hasAnimation }: comment) {
  const [{ commentData }, setState] = useSetState({
    commentData: [],
  });

  const { loginState } = useSelector((state: any) => state);

  const getCommentData = () => {
    request
      .get("/comment/query", {
        params: {
          articleId,
        },
      })
      .then((res: any) => {
        setState({ commentData: res.data });
      });
  };

  useMount(() => getCommentData());

  const currentCommentData = commentData.filter(
    (item: any) => item.reply_id === 0 || !item.reply_id
  );

  const commentItem = (props: any) => {
    const replyData = commentData
      .filter((item: any) => {
        return item.reply_id === props.id;
      })
      .reverse();

    return (
      <Reply
        commentItem={props}
        refresh={getCommentData}
        replyData={replyData}
        hasAnimation={hasAnimation}
      />
    );
  };

  return (
    <>
      {title && <Divider>{title}</Divider>}
      {loginState ? (
        <Editor
          btnName={btnName}
          articleId={articleId}
          refresh={getCommentData}
          hasAnimation={hasAnimation}
        />
      ) : (
        <Alert message="登录后可发表评论" type="info" showIcon />
      )}
      <List
        dataSource={currentCommentData}
        header={
          <span className="total">{`${currentCommentData.length}条评论`}</span>
        }
        itemLayout="horizontal"
        className="commentCon"
        renderItem={commentItem}
        locale={{ emptyText: "暂无评论，快发表第一个热评！" }}
        loading={!commentData.length && articleId === 99999}
      />
    </>
  );
}

export default Index;
