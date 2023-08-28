import { Icon } from "@/components";
import { Button } from "antd";
import { ToolBarWrapper } from "../styled";
import useStore from "../store";

const ToolBar = () => {
  const { autoScroll } = useStore();

  return (
    <ToolBarWrapper direction="vertical">
      <Button type="primary" icon={<Icon type="icon-fangda" />} />
      <Button
        type={autoScroll ? "primary" : "default"}
        icon={<Icon type="icon-Scroll-Up" />}
        onClick={() => useStore.setState({ autoScroll: !autoScroll })}
      />
    </ToolBarWrapper>
  );
};

export default ToolBar;
