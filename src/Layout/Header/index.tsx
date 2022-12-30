import { NavLink, useNavigate } from "react-router-dom";
import { Popover } from "@arco-design/web-react";
import { MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Icon } from "@/components";
import menus from "@/router";
import { useWindowSize, useRedux, useBoolean, useMount } from "@/hooks";
import Login from "./Login";
import { Tooltip, Modal, Switch, Button } from "antd";
import { useMemo } from "react";
import "./style.scss";

const theme = [
  { bg: 217, color: "#1890ff" },
  { bg: 125, color: "#25b864" },
  { bg: 0, color: "#d6324d" },
];

const first = localStorage.getItem("first");

function Header({ style }) {
  const navigate = useNavigate();

  const [setVisible, on, off] = useBoolean();

  const { store, dispatch } = useRedux();

  const { simple, autoplay } = store;

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

  useMount(() => {
    if (!first) {
      localStorage.setItem("first", "no");
      on();
    }
  });

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
        <Tooltip title="网站设置">
          <div className="setting" onClick={on}>
            <SettingOutlined />
          </div>
        </Tooltip>
        <div className="user">
          <Login />
        </div>
      </div>

      <Modal
        visible={setVisible}
        onCancel={off}
        closable={false}
        okText="确认"
        cancelText="取消"
        title={first ? "本站设置" : "欢迎光临本站，建议简单设置一下~~"}
        onOk={() => window.location.reload()}
        destroyOnClose
        // getContainer={false}
      >
        <ul className="setting">
          <li>
            <h4>播放背景音乐：</h4>
            <Switch
              checked={autoplay}
              defaultChecked
              onChange={() => dispatch({ type: "CHANGE_AUTOPLAY" })}
            />
            <span className="tip">开启后，将自动播放背景音乐</span>
          </li>
          <li>
            <h4>主题颜色：</h4>
            {theme.map((item) => {
              return (
                <div
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
                </div>
              );
            })}
          </li>
          <li>
            <h4>简约模式：</h4>
            <Switch
              checked={simple}
              onChange={(val) => {
                dispatch({ type: "CHANGE_SIMPLE", payload: val });
              }}
            />
            <span className="tip">
              开启后，会隐藏本站得canvas特效，防止引起电脑风扇的咆哮
            </span>
          </li>

          <li>
            <Button
              type="primary"
              className="goAdmin"
              onClick={() => window.open("https://www.hyl999.co:81/#/home")}
            >
              进入网站后台管理
            </Button>
          </li>
        </ul>
      </Modal>
    </header>
  );
}

export default Header;
