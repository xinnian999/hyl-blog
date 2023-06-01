import { useBoolean } from "@/hooks";
import { Modal } from "antd";
import Icon from "./Icon";
import styled from "styled-components";

const PreviewWrapper = styled.div`
  position: relative;
  .preview {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    padding: 2px 8px;
    cursor: pointer;
    font-size: 15px;
  }
`;

interface PreviewProps {
  children: React.ReactNode;
  title: string;
}

const Preview: React.FC<PreviewProps> = ({ children, title }) => {
  const [visible, on, off] = useBoolean(false);

  return (
    <PreviewWrapper>
      <button className="preview" onClick={on}>
        <Icon type="icon-fangda" />
      </button>

      {children}
      <Modal
        title={title}
        open={visible}
        onCancel={off}
        width="80vw"
        footer={[]}
        centered
      >
        {children}
      </Modal>
    </PreviewWrapper>
  );
};

export default Preview;
