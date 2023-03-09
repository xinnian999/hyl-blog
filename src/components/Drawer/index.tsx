import { Drawer as AntdDrawer } from "antd";
import { useBoolean } from "@/hooks";
import { MenuOutlined } from "@ant-design/icons";
import { memo } from "react";

interface DrawerProps extends DomProps {
  title?: string;
  placement: any;
}

function Drawer(props: DrawerProps) {
  const { children, className, id, title, placement } = props;

  const [open, on, off] = useBoolean(false);

  return (
    <>
      <div className={className} id={id} onClick={on}>
        <MenuOutlined />
      </div>
      <AntdDrawer
        title={title}
        placement={placement}
        onClose={off}
        width="60%"
        open={open}
        destroyOnClose
      >
        {children}
      </AntdDrawer>
    </>
  );
}

export default memo(Drawer);
