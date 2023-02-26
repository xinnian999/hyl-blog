import { Drawer, Menu } from "antd";
import menus from "@/router";
import { useBoolean } from "@/hooks";
import { MenuOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Icon } from "@/components";
import { NavLink } from "react-router-dom";
import "./style.scss";

type MenuItem = Required<MenuProps>["items"][number];

function IphoneNav() {
  const [open, on, off] = useBoolean(false);

  const items = menus
    .filter((item) => item.title)
    .map((item: any) => {
      const { title, icon, children, path } = item;

      const r: any = {
        ...item,
        label: <NavLink to={path}>{title}</NavLink>,
        key: title,
        icon: <Icon type={icon} />,
      } as MenuItem;

      if (children) {
        r.children = children.map((v) => ({
          label: <NavLink to={`${path}/${v.path}`}>{v.title}</NavLink>,
          key: v.title,
          icon: <Icon type={v.icon} />,
        }));
      }

      return r;
    });

  return (
    <>
      <div id="iphone-menus" onClick={on}>
        <MenuOutlined />
      </div>
      <Drawer
        title="导航菜单"
        placement="left"
        onClose={off}
        width="60%"
        open={open}
        getContainer={() => document.getElementById("main")!}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          //   inlineCollapsed={collapsed}
          items={items}
        />
      </Drawer>
    </>
  );
}

export default IphoneNav;
