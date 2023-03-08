import { Menu } from "antd";
import { router } from "@/config";
import type { MenuProps } from "antd";
import { Icon, Drawer } from "@/components";
import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";
import { memo } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function IphoneNav() {
  const localtion = useLocation();

  const items = router
    .filter((item) => item.title)
    .map((item: any) => {
      const { title, icon, children, path } = item;

      const r: any = {
        ...item,
        label: children ? title : <NavLink to={path}>{title}</NavLink>,
        key: path,
        icon: <Icon type={icon} />,
      } as MenuItem;

      if (children) {
        r.children = children.map((v) => ({
          label: <NavLink to={`${path}/${v.path}`}>{v.title}</NavLink>,
          key: `${path}/${v.path}`,
          icon: <Icon type={v.icon} />,
        }));
      }

      return r;
    });

  return (
    <Drawer id="iphone-menus" title="导航菜单" placement="left">
      <Menu
        defaultSelectedKeys={[localtion.pathname]}
        defaultOpenKeys={["/" + localtion.pathname.split("/")[1]]}
        mode="inline"
        items={items}
      />
    </Drawer>
  );
}

export default memo(IphoneNav);
