import { Divider } from "antd";
import "./style.scss";

interface ToolItemProps {
  title: string;
  icon: any;
  children: React.ReactNode;
}

function ToolItem(props: ToolItemProps) {
  const { title, icon, children } = props;
  return (
    <div className="toolItem  box-shadow">
      <div className="catalogue">
        {icon} <span>{title}</span>
      </div>
      <Divider></Divider>
      <div className="aboutArticle">{children}</div>
    </div>
  );
}

export default ToolItem;
