import { Drawer as AntdDrawer, DrawerProps as AntdDrawerProps } from "antd";
import { useBoolean } from "@/hooks";
import { memo } from "react";

interface DrawerProps extends AntdDrawerProps {
  flag: React.ReactNode;
}

function Drawer(props: DrawerProps) {
  const { flag, ...antdDrawerProps } = props;

  const [open, on, off] = useBoolean(false);

  return (
    <>
      <span onClick={on}>{flag}</span>
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
