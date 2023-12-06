import { useBoolean } from "@/hooks";
import { Modal } from "antd";
import Icon from "./Icon";
import styled from "styled-components";

const PreviewWrapper = styled.div<any>`
  position: relative;
  .preview {
    position: absolute;
    right: ${(props) => `${props.btnPosition.x}px`};
    top: ${(props) => `${props.btnPosition.y}px`};
    font-size: 12px;
    padding: 2px 8px;
    cursor: pointer;
    font-size: 15px;
    z-index: 10;
  }
`;

interface PreviewProps {
  children: React.ReactNode;
  title?: string;
  width?: string;
  btnPosition?: {
    x: number;
    y: number;
  };
}

const Preview: React.FC<PreviewProps> = ({
  children,
  title,
  width = "80vw",
  btnPosition = { x: 0, y: 0 },
}) => {
  const [visible, on, off] = useBoolean(false);

  return (
    <PreviewWrapper btnPosition={btnPosition}>
      <button className="preview" onClick={on}>
        <Icon type="icon-fangda" />
      </button>

      {children}
      <Modal
        title={title}
        open={visible}
        onCancel={off}
        width={width}
        footer={[]}
        centered
      >
        {children}
      </Modal>
    </PreviewWrapper>
  );
};

export default Preview;
