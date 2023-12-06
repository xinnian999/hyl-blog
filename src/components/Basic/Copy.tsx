import { CopyOutlined } from "@ant-design/icons";
import { copy } from "hyl-utils";
import styled from "styled-components";

const CopyWrapper = styled.div`
  position: relative;
  .copy {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    padding: 2px 8px;
    cursor: pointer;
    font-size: 15px;
  }
`;

interface CopyProps {
  children: React.ReactNode;
  content: string;
}

const Copy: React.FC<CopyProps> = ({ children, content }) => {
  return (
    <CopyWrapper>
      <button className="copy" onClick={() => copy(content)}>
        <CopyOutlined />
      </button>
      {children}
    </CopyWrapper>
  );
};

export default Copy;
