import { Button, Input, message, Space } from "antd";
import { Popover } from "@arco-design/web-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { SmileOutlined } from "@ant-design/icons";
import { useSetState } from "@/hooks";
import { Time, request } from "@/utils";
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

  const { userInfo } = useSelector((state: any) => state);

  const inputRef = useRef(null);

  const onChangeValue = (e: any) => {
    setState({ value: e.target.value });
  };

  const onSubmit = () => {
    if (!value) return message.warning("评论内容不能为空");

    const { headPicture, username, email, id: author_id } = userInfo;
    const data = {
      content: value,
      avatar: headPicture,
      author: username,
      email,
      datetime: Time.getStandardTime(new Date()),
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
          onClick={onSubmit}
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
    </div>
  );
}
