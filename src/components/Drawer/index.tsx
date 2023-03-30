import { Drawer as AntdDrawer, DrawerProps as AntdDrawerProps } from "antd";
import { useBoolean } from "@/hooks";
import { memo } from "react";

interface DrawerProps extends AntdDrawerProps {
  Flag: any;
}

function Drawer(props: DrawerProps) {
  const { Flag, ...antdDrawerProps } = props;

  const [open, on, off] = useBoolean(false);

  return (
    <>
      <Flag onClick={on} />
      <AntdDrawer
        onClose={off}
        width="60%"
        open={open}
        destroyOnClose
        getContainer={() => document.querySelector("#main")!}
        {...antdDrawerProps}
      />
    </>
  );
}

export default memo(Drawer);
