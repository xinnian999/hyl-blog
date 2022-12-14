import { useBoolean } from "@/hooks";
import { Modal } from "antd";
import Copy from "../Copy";
import Icon from "../Icon";
import "./style.scss";

export default function Preview({ children, title }) {
  const [visible, on, off] = useBoolean(false);

  return (
    <div className="preview-container">
      <button className="preview" onClick={on}>
        <Icon type="icon-fangda" />
      </button>

      {children}
      <Modal
        title={title}
        visible={visible}
        onCancel={off}
        width="80vw"
        footer={[]}
        centered
      >
        <Copy content={children.props.children}>{children}</Copy>
      </Modal>
    </div>
  );
}
