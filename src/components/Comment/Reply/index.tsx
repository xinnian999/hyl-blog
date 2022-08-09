import { Comment, List, message } from "antd";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { useSetState } from "@/hooks";
import { request } from "@/utils";
import Editor from "../Editor";

const Reply = ({ commentItem, refresh, replyData, hasAnimation }: any) => {
  const { userInfo, loginState } = useSelector((state: any) => state);

  const [{ visible, replyName, replyEmail }, setState] = useSetState({
    visible: false,
    replyName: undefined,
    replyEmail: undefined,
  });

  const { id: author_id } = userInfo;

  const cancelEditor = () => {
    setState({ visible: false });
  };

  const handleDelete = (itemData: any) => {
    request.delete("/comment/delete", { params: itemData }).then((res: any) => {
      if (res.status === 0) {
        refresh();
        message.success("删除评论成功");
      }
    });
  };

  const renderAction = (item: any) => {
    const action = [
      {
        name: "回复",
        handle: (itemData: any) => {
          setState({
            visible: true,
            replyName: itemData.author,
            replyEmail: itemData.email,
          });
        },
      },
    ];

    if (author_id === item.author_id) {
      action.push({
        name: "删除",
        handle: handleDelete,
      });
    }

    if (!loginState) return [];
    return action.map(({ name, handle }: any) => (
      <span onClick={() => handle(item)}>{name}</span>
    ));
  };

  const author = (item: any) => (
    <div>
      <span className="username">
        {author_id === item.author_id ? `${item.author}（me）` : item.author}
      </span>
      {item.author_id === 30 && <span className="boss">站长</span>}
    </div>
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
        className="replyCon"
      >
        {replyData.length ? (
          <List
            className="itemList"
            dataSource={replyData}
            itemLayout="horizontal"
            renderItem={(props: any) => (
              <Comment
                {...props}
                content={`回复 ${props.reply_name} : ${props.content}`}
                author={author(props)}
                actions={renderAction(props)}
              />
            )}
          />
        ) : null}
      </Comment>
      {visible && loginState && (
        <div className="replyEditor">
          <Editor
            btnName={`回复 ${replyName}`}
            placeholder={`回复 ${replyName}`}
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
      <hr color="#eee" />
    </div>
  );
};

export default Reply;
