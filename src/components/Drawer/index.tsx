import { Drawer as AntdDrawer } from "antd";
import { useBoolean } from "@/hooks";
import { MenuOutlined } from "@ant-design/icons";
type drawerProps = {
  children: any;
  className?: string;
  id?: string;
  title?: string;
  placement: any;
};
function Drawer({ children, className, id, title, placement }: drawerProps) {
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
        width="50%"
        open={open}
        destroyOnClose
        getContainer={() => document.getElementById("main")!}
      >
        {children}
      </AntdDrawer>
    </>
  );
}

export default Drawer;
