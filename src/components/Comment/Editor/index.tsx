import { Button, Input, message, Modal, Space } from "antd";
import { Popover } from "@arco-design/web-react";
import { useRef } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { classnames, time } from "hyl-utils";
import { useBoolean, useRedux, useSetState } from "@/hooks";
import { request } from "@/utils";
import { insertText } from "./insertText";
import emoji from "./emoji";
import "./style.scss";

const { TextArea } = Input;

interface editor {
  btnName: string;
  articleId: string;
  replyData?: any;
  refresh: Function;
  onClose?: any;
  placeholder?: string;
  hasAnimation?: boolean;
}

export default function Editor({
  btnName,
  articleId,
  replyData,
  refresh,
  placeholder,
  onClose,
  hasAnimation,
}: editor) {
  const [{ value, loading }, setState] = useSetState({
    value: "",
    loading: false,
  });

  const { store, dispatch } = useRedux();

  const { userInfo } = store;

  const inputRef = useRef(null);
  const emailInputRef: any = useRef(null);

  const [open, on, off] = useBoolean(false);

  const onChangeValue = (e: any) => {
    setState({ value: e.target.value });
  };

  const onSubmit = () => {
    const { headPicture, username, email, id: author_id } = userInfo;

    if (!value) return message.warning("评论内容不能为空");

    const data = {
      content: value,
      avatar: headPicture,
      author: username,
      email,
      datetime: time.parse(new Date()),
      article_id: articleId,
      author_id,
    };
    if (replyData) {
      Object.assign(data, replyData);
    }

    setState({ loading: true });
    request.post("/comment/add", data).then((res: any) => {
      if (res.status === 0) {
        setState({ loading: false, value: "" });
        refresh();
        message.success("发表评论成功");
      }
    });
  };

  const onOkEmail = () => {
    const emailValue = emailInputRef.current.input.value;
    const emailExp =
      /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
    if (!emailExp.test(emailValue)) return message.error("邮箱格式不合法");

    dispatch({
      type: "CHANGE_USER_INFO",
      payload: { email: emailValue },
    });
    off();
    message.success("绑定邮箱成功");
  };

  const content = (
    <ul className="emojiAll">
      {emoji.map((item, index) => (
        <li
          onClick={() => insertText(inputRef, item, setState)}
          key={item + index}
        >
          {item}
        </li>
      ))}
    </ul>
  );

  const classname = classnames("comment-editor", {
    animate__animated: hasAnimation,
    animate__fadeInDown: hasAnimation,
  });

  return (
    <div className={classname}>
      <div className="toolbar">
        <Popover content={content} trigger="click">
          <SmileOutlined className="emoji-icon" />
        </Popover>
      </div>
      <TextArea
        rows={4}
        placeholder={placeholder}
        onChange={onChangeValue}
        value={value}
        ref={inputRef}
        className="editor"
      />
      <Space>
        <Button
          htmlType="submit"
          loading={loading}
          onClick={() => {
            if (!userInfo.email) {
              return on();
            }

            onSubmit();
          }}
          type="primary"
        >
          {btnName}
        </Button>
        {onClose && (
          <Button htmlType="submit" onClick={onClose}>
            收起
          </Button>
        )}
      </Space>

      <Modal
        title="绑定邮箱"
        visible={open}
        onCancel={off}
        okText="绑定"
        keyboard={false}
        closable={false}
        footer={[
          <Button key="submit" type="primary" onClick={onOkEmail}>
            绑定
          </Button>,
        ]}
      >
        <div className="emailTip">请绑定邮箱，将用于接收回复通知的邮件</div>
        <Input ref={emailInputRef} placeholder="请输入你的邮箱..." />
      </Modal>
    </div>
  );
}
