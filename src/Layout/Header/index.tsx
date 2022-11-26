import { NavLink, useNavigate } from "react-router-dom";
import { Popover, Dropdown, Menu } from "@arco-design/web-react";
import {
  MenuOutlined,
  BgColorsOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Icon } from "@/components";
import menus from "@/router";
import { useWindowSize, useRedux } from "@/hooks";
import Login from "./Login";
import User from "./User";
import { Button, Tooltip } from "antd";
import { useMemo } from "react";
import "./style.scss";

const theme = [
  { bg: 125, color: "#25b864" },
  { bg: 217, color: "#1890ff" },
  { bg: 0, color: "#d6324d" },
];

function Header() {
  const navigate = useNavigate();

  const { store, dispatch } = useRedux();

  const { loginState } = store;

  const goHome = () => navigate("/home");

  const { width } = useWindowSize();

  const renderMenus = useMemo(
    () =>
      menus.map((item: any) => {
        const { title, path, search, icon } = item;
        if (title) {
          return (
            <NavLink
              key={title}
              to={{
                pathname: path,
                search,
              }}
            >
              <li>
                <Icon type={icon} /> {title}
              </li>
            </NavLink>
          );
        }
        return null;
      }),
    []
  );

  const themeList = (
    <Menu className="themeList">
      {theme.map((item) => {
        return (
          <Menu.Item
            key={item.color}
            className="themeItem"
            style={{ backgroundColor: item.color }}
            onClick={() =>
              dispatch({
                type: "CHANGE_THEME",
                payload: item,
              })
            }
          >
            {item.color === store.theme.color && "✔️"}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <header>
      <div id="iphone-menus">
        <Popover
          content={<ul className="iphone-nav">{renderMenus}</ul>}
          trigger="click"
          getPopupContainer={(node: HTMLElement) => node}
        >
          <MenuOutlined />
        </Popover>
      </div>
      <div id="logo" onClick={goHome}>
        <span>心念の空间站</span>
      </div>
      {width > 1300 && <ul id="nav">{renderMenus}</ul>}

      <div className="header-action">
        {width > 1300 && (
          <div className="toolbar">
            <Tooltip title="切换主题" placement="left">
              <Dropdown droplist={themeList} trigger="click">
                <div className="toolbar-item">
                  <BgColorsOutlined />
                </div>
              </Dropdown>
            </Tooltip>
            <Tooltip title="访问网站后台">
              <div
                className="toolbar-item"
                onClick={() => window.open("https://www.hyl999.co:81/")}
              >
                <SettingOutlined />
              </div>
            </Tooltip>
          </div>
        )}

        <div className="user">{loginState ? <User /> : <Login />}</div>
      </div>
    </header>
  );
}

export default Header;
