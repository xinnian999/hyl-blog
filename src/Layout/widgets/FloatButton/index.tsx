import { App, Tooltip } from "antd";
import { SettingOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useRedux, useScroll } from "@/hooks";
import { Icon } from "@/components";
import { FloatButtonWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

function FloatButton() {
  const { top } = useScroll();

  const {
    store: {
      setStore: { dark },
    },
    dispatch,
  } = useRedux();

  const action = [
    {
      icon: <Icon type="icon-Magnifier" />,
      message: "全站搜索",
      onclick: () => {
        dispatch({ type: "CHANGE_SEARCH_DRAWER", payload: true });
      },
    },
    {
      icon: <SettingOutlined />,
      message: "网站设置",
      onclick: () => {
        dispatch({ type: "CHANGE_SET_MODAL", payload: true });
      },
    },
    {
      icon: <Icon type={dark ? "icon-moon-fill" : "icon-sun_fill"} />,
      message: dark ? "开灯" : "关灯",
      onclick: () => {
        dispatch({ type: "CHANGE_DARK", payload: !dark });
      },
    },
    {
      icon: top > 200 ? <VerticalAlignTopOutlined /> : null,
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
    <FloatButtonWrapper direction="vertical">
      {action.map(({ icon, message, onclick }) => {
        return (
          <Tooltip title={message} placement="left" key={message}>
            <div className="item" onClick={onclick}>
              {icon}
            </div>
          </Tooltip>
        );
      })}
    </FloatButtonWrapper>
  );
}

export default FloatButton;
