import { Drawer } from "@/components";
import { Affix } from "antd";
import { ToolbarWrapper, ToolbarFlag } from "./styled";

const Toolbar = ({ children }: DomProps) => {
  return (
    <>
      <ToolbarWrapper>
        <Affix offsetTop={80}>{children}</Affix>
      </ToolbarWrapper>
      <Drawer placement="right" Flag={ToolbarFlag}>
        {children}
      </Drawer>
    </>
  );
};

export default Toolbar;
