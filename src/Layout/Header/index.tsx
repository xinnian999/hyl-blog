import { NavLink, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import { Icon } from "@/components";
import menus from "@/router";
import { useWindowSize, useRedux } from "@/hooks";
import Login from "./Login";
import { Modal, Switch, Button, Popover } from "antd";
import { useMemo } from "react";
import "./style.scss";

const theme = [
  { bg: 217, color: "#1890ff" },
  { bg: 125, color: "#25b864" },
  { bg: 0, color: "#d6324d" },
];

function Header({ style }) {
  const navigate = useNavigate();

  const { store, dispatch } = useRedux();

  const { simple, autoplay, setModal } = store;

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

  return (
    <header style={style}>
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
        <div className="user">
          <Login />
        </div>
      </div>
    </header>
  );
}

export default Header;
