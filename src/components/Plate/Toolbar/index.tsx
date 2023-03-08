import { Drawer } from "@/components";
import { useWindowSize, useScroll } from "@/hooks";
import { classnames } from "hyl-utils";
import { useMemo, useRef } from "react";
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

  return (
    <div className="plate-toolbar" ref={toobarRef}>
      {size.width < 800 ? (
        <Drawer className="toolbarFlag box-shadow" placement="right">
          {el}
        </Drawer>
      ) : (
        el
      )}
    </div>
  );
};

export default Toolbar;
