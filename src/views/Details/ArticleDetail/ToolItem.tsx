import { Divider } from "antd";
import { ToolItem as ToolItemWrapper } from "./styled";

interface ToolItemProps {
  title: string;
  icon: any;
  children: React.ReactNode;
}

function ToolItem(props: ToolItemProps) {
  const { title, icon, children } = props;
  return (
    <ToolItemWrapper>
      <div className="catalogue">
        {icon} <span>{title}</span>
      </div>
      <Divider></Divider>
      {children}
    </ToolItemWrapper>
  );
}

export default ToolItem;
