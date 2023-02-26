import { Button, Space, App, Tooltip } from "antd";
import { SettingOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useRedux, useScroll } from "@/hooks";
import setModalConfig from "./setModal";
import "./style.scss";
import { Icon } from "@/components";

function FloatButton() {
  const { top } = useScroll();

  const { modal } = App.useApp();

  const { store, dispatch } = useRedux();

  const action = [
    {
      icon: <SettingOutlined />,
      color: "chocolate",
      message: "网站设置",
      onclick: () => {
        modal.confirm(setModalConfig);
      },
    },
    {
      icon: <Icon type={store.dark ? "icon-moon-fill" : "icon-sun_fill"} />,
      color: "#558897",
      message: store.dark ? "开灯" : "关灯",
      onclick: () => {
        dispatch({ type: "CHANGE_DARK", payload: !store.dark });
      },
    },
    {
      icon: <VerticalAlignTopOutlined />,
      color: "",
      message: "回顶部",
      onclick: () => {
        const anchorListEl = document.querySelector("body");
        anchorListEl?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
    },
  ];

  return (
    <Space id="FloatButton" direction="vertical">
      {action.map(({ icon, color, message, onclick }) => {
        if (top > 1) {
          return (
            <Tooltip title={message} placement="left" key={message}>
              <Button
                type="primary"
                icon={icon}
                size="large"
                onClick={onclick}
                style={{ background: color }}
                className="animate__animated  animate__lightSpeedInRight"
              />
            </Tooltip>
          );
        }
        return null;
      })}
    </Space>
  );
}

export default FloatButton;