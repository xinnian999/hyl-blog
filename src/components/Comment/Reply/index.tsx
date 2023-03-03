import Comment from "../CommentCard";
import { classnames } from "hyl-utils";
import { useSetState, useRedux } from "@/hooks";
import Editor from "../Editor";

const Reply = ({ commentItem, refresh, replyData, hasAnimation }) => {
  const { store } = useRedux();

  const [{ visible, replyName, replyEmail, content }, setState] = useSetState({
    visible: false,
    replyName: undefined,
    replyEmail: undefined,
    content: "",
  });

  const cancelEditor = () => {
    setState({ visible: false });
  };

  const handleReply = (props) => {
    setState({
      visible: true,
      replyName: props.author,
      replyEmail: props.email,
      content: props.content,
    });
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
        author={author(commentItem)}
        reply={() => handleReply(commentItem)}
      >
        {replyData.length > 0 &&
          replyData.map((props, i) => (
            <div className="commentReply" key={props.id}>
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
                reply={() => handleReply(props)}
              />
            </div>
          ))}
        {visible && store.loginState && (
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
