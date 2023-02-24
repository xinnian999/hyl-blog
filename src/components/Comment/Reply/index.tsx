import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import Comment from "../Comment";
import { classnames, pick } from "hyl-utils";
import { useSetState } from "@/hooks";
import { request } from "@/utils";
import Editor from "../Editor";

const Reply = ({ commentItem, refresh, replyData, hasAnimation }: any) => {
  const { userInfo, loginState } = useSelector((state: any) => state);

  const [{ visible, replyName, replyEmail, content }, setState] = useSetState({
    visible: false,
    replyName: undefined,
    replyEmail: undefined,
    content: "",
  });

  const { id: author_id } = userInfo;

  const cancelEditor = () => {
    setState({ visible: false });
  };

  const renderAction = (item: any) => {
    const handleReply = () => {
      setState({
        visible: true,
        replyName: item.author,
        replyEmail: item.email,
        content: item.content,
      });
    };

    const handleDelete = () => {
      request
        .delete("/comment/delete", pick(item, ["id", "reply_id", "article_id"]))
        .then((res: any) => {
          if (res.status === 0) {
            refresh();
            message.success("删除评论成功");
          }
        });
    };

    const action: any = [
      <span onClick={handleReply} key="reply">
        回复
      </span>,
      author_id == item.author_id ? (
        <Popconfirm
          title="确认删除这条评论吗？"
          onConfirm={handleDelete}
          okText="yes"
          cancelText="no"
          key="delete"
        >
          <span>删除</span>
        </Popconfirm>
      ) : null,
    ];

    if (!loginState) return [];

    return action;
  };

  const author = (item: any) => (
    <>
      <span className="username">{item.author}</span>{" "}
      {item.author_id == 30 && <span className="boss">站长</span>}
    </>
  );

  const classname = classnames("replyItem", {
    animate__animated: hasAnimation,
    animate__zoomIn: hasAnimation,
  });

  return (
    <div className={classname}>
      <Comment
        {...commentItem}
        actions={renderAction(commentItem)}
        author={author(commentItem)}
        className={classnames({ grid: true })}
      >
        {replyData.length > 0 &&
          replyData.map((props, i) => (
            <div className="commentReply">
              <div key={props.id}>
                <Comment
                  {...props}
                  content={
                    <span>
                      回复{" "}
                      <span className="primaryColor">{props.reply_name}</span> :{" "}
                      {props.content}
                    </span>
                  }
                  author={author(props)}
                  actions={renderAction(props)}
                  className={classnames({ grid: i + 1 !== replyData.length })}
                />
              </div>
            </div>
          ))}
        {visible && loginState && (
          <div className="replyEditor">
            <Editor
              btnName={`回复 ${replyName}`}
              placeholder={`${replyName}: ${content}`}
              articleId={commentItem.article_id}
              refresh={refresh}
              replyData={{
                reply_id: commentItem.id,
                reply_name: replyName,
                reply_Email: replyEmail,
              }}
              onClose={cancelEditor}
              hasAnimation
            />
          </div>
        )}
      </Comment>
    </div>
  );
};

export default Reply;
