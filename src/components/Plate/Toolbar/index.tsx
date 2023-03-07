import { Drawer } from "@/components";
import { useWindowSize, useScroll } from "@/hooks";
import { classnames } from "hyl-utils";
import { useMemo, useRef } from "react";
import "./style.scss";

const Toolbar = ({ children }) => {
  const toobarRef = useRef(null) as any;

  const size = useWindowSize();

  const scrollNum = useScroll()!;

  const toolbar = useMemo(() => {
    const el = (
      <div
        style={{
          width: size.width > 800 ? toobarRef.current?.clientWidth : "auto",
        }}
        className={classnames({
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

    return el;
  }, [scrollNum]);

  return (
    <div className="plate-toolbar" ref={toobarRef}>
      {toolbar}
    </div>
  );
};

export default Toolbar;
