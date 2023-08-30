import { InputWrapper } from "../styled";
import { Button, Input } from "antd";
import useStore from "../store";

const { setState } = useStore;

function MsgInput({ handleMessageSend }) {
  const { value, disabled, controller } = useStore();

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      setState({ value: value + "\n" });
    }
    if (e.keyCode === 13) {
      return handleMessageSend();
    }
  };

  return (
    <InputWrapper>
      <Input.TextArea
        value={value}
        disabled={disabled}
        onChange={(e) => setState({ value: e.target.value })}
        placeholder="你想对Ai说什么？（支持回车发送，ctrl+回车换行）"
        autoSize={{ minRows: 3, maxRows: 6 }}
        onKeyDown={handleKeyDown}
      />
      {disabled && (
        <Button
          className="sendBtn"
          type="primary"
          onClick={() => {
            controller.abort();
            setState({ disabled: false });
          }}
        >
          终止
        </Button>
      )}
      <Button
        className="sendBtn"
        type="primary"
        disabled={disabled}
        onClick={() => handleMessageSend()}
      >
        发送
      </Button>
    </InputWrapper>
  );
}

export default MsgInput;
