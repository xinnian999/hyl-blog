import { Drawer } from "@/components";
import { Affix } from "antd";
import { ReactNode } from "react";
import { ToolbarWrapper, ToolbarItem, ToolbarFlag } from "./styled";

const Toolbar = ({ children, style }: DomProps) => {
  const el = Array.isArray(children) ? (
    <div>
      {(children as ReactNode[]).map((item) => {
        return <ToolbarItem>{item}</ToolbarItem>;
      })}
    </div>
  ) : (
    <ToolbarItem>{children}</ToolbarItem>
  );

  return (
    <>
      <ToolbarWrapper style={style}>
        <Affix style={{ zIndex: 0 }} offsetTop={80}>
          {el}
        </Affix>
      </ToolbarWrapper>
      <Drawer placement="right" Flag={ToolbarFlag}>
        {el}
      </Drawer>
    </>
  );
};

export default Toolbar;
