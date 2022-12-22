import { CopyOutlined } from "@ant-design/icons";
import { copy } from "@/utils";
import "./style.scss";

interface CopyProps {
  children: JSX.Element;
  content: string;
}

export default function Copy({ children, content }: CopyProps) {
  return (
    <div className="copy-container">
      <button className="copy" onClick={() => copy(content)}>
        <CopyOutlined />
      </button>
      {children}
    </div>
  );
}
