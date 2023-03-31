import { Drawer } from "@/components";
import { useWindowSize } from "@/hooks";
import { Affix } from "antd";
import { ReactNode } from "react";
import { ToolbarWrapper, ToolbarItem, ToolbarFlag } from "./styled";

const Toolbar = ({ children, style }: DomProps) => {
  const { width } = useWindowSize();
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
      {width > 800 ? (
        <ToolbarWrapper style={style}>
          <Affix style={{ zIndex: 0 }} offsetTop={80}>
            {el}
          </Affix>
        </ToolbarWrapper>
      ) : (
        <Drawer placement="right" Flag={ToolbarFlag}>
          {el}
        </Drawer>
      )}
    </>
  );
};

export default Toolbar;
