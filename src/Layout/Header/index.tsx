import { useNavigate } from "react-router-dom";
import { Popover, Dropdown, Menu } from "@arco-design/web-react";
import {
  MenuOutlined,
  BgColorsOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import logo from "@/assets/img/logo.png";
import { useWindowSize, useRedux } from "@/hooks";
import Login from "./Login";
import User from "./User";
import { Tooltip } from "antd";

const theme = [
  { bg: 125, color: "#25b864" },
  { bg: 217, color: "#1890ff" },
  { bg: 0, color: "#d6324d" },
];

function Header({ menus }: any) {
  const navigate = useNavigate();

  const { store, dispatch } = useRedux();

  const { loginState } = store;

  const goHome = () => navigate("/home");

  const { width } = useWindowSize();

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
          content={<div className="iphone-nav">{menus}</div>}
          trigger="click"
        >
          <MenuOutlined />
        </Popover>
      </div>
      <div id="logo">
        <span>心念の空间站</span>
      </div>
      {width > 800 && <ul id="nav">{menus}</ul>}

      <div className="header-action">
        <div className="toolbar">
          <Tooltip title="切换主题" placement="left">
            <Dropdown droplist={themeList} trigger="click">
              <div className="toolbar-item">
                <BgColorsOutlined />
              </div>
            </Dropdown>
          </Tooltip>
          {width > 1000 && (
            <Tooltip title="访问网站后台">
              <div
                className="toolbar-item"
                onClick={() => window.open("https://www.hyl999.co:81/")}
              >
                <SettingOutlined />
              </div>
            </Tooltip>
          )}
        </div>

        <div className="user">{loginState ? <User /> : <Login />}</div>
      </div>
    </header>
  );
}

export default Header;
