import CommentCard from "../CommentCard";
import { useSetState, useGlobalStore } from "@/hooks";
import Editor from "../Editor";

interface ReplyProps {
  commentItem: CommentData;
  refresh: Function;
  replyData: any;
}

const Reply = (props: ReplyProps) => {
  const { commentItem, refresh, replyData } = props;

  const { loginState } = useGlobalStore();

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

  return (
    <div className="replyItem">
      <CommentCard
        {...commentItem}
        author={author(commentItem)}
        reply={() => handleReply(commentItem)}
      >
        {replyData.length > 0 &&
          replyData.map((props) => (
            <div className="commentReply" key={props.id}>
              <CommentCard
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
            />
          </div>
        )}
      </CommentCard>
    </div>
  );
};

export default Reply;
