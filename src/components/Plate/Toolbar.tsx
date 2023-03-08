import { Drawer } from "@/components";
import { useWindowSize, useScroll } from "@/hooks";
import { classnames } from "hyl-utils";
import { useRef } from "react";
import "./style.scss";

const Toolbar = ({ children, className = "" }: DomProps) => {
  const toobarRef = useRef(null) as any;

  const size = useWindowSize();

  const scrollNum = useScroll()!;

  const el = (
    <div
      style={{
        width: size.width > 800 ? toobarRef.current?.clientWidth : "auto",
      }}
      className={classnames(className, {
        "plate-toolbar-fixed": scrollNum?.top > 490,
      })}
    >
      {children}
    </div>
  );

  if (size.width < 800) {
    return (
      <Drawer className="toolbarFlag box-shadow" placement="right">
        {el}
      </Drawer>
    );
  }
  return (
    <div className="plate-toolbar" ref={toobarRef}>
      {el}
    </div>
  );
};

export default Toolbar;
