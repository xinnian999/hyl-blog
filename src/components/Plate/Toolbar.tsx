import { Drawer } from "@/components";
import { Affix } from "antd";
import { classnames } from "hyl-utils";
import { useRef } from "react";
import "./style.scss";

const Toolbar = ({ children, className = "" }: DomProps) => {
  const toobarRef = useRef(null) as any;

  const el = (
    <Affix offsetTop={80}>
      <div className={classnames(className, {})}>{children}</div>
    </Affix>
  );

  return (
    <>
      <div className="plate-toolbar" ref={toobarRef}>
        {el}
      </div>
      <Drawer className="toolbarFlag" placement="right">
        <div className={classnames(className, {})}>{children}</div>
      </Drawer>
    </>
  );
};

export default Toolbar;
