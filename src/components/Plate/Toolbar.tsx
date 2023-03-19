import { Drawer } from "@/components";
import { Affix } from "antd";
import { ReactNode } from "react";
import { ToolbarWrapper, ToolbarItem, ToolbarFlag } from "./styled";

const Toolbar = ({ children }: DomProps) => {
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
      <ToolbarWrapper>
        <Affix offsetTop={80}>{el}</Affix>
      </ToolbarWrapper>
      <Drawer placement="right" Flag={ToolbarFlag}>
        {el}
      </Drawer>
    </>
  );
};

export default Toolbar;
