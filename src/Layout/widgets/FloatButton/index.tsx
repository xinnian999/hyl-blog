import { App, Tooltip } from "antd";
import { SettingOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useRedux, useScroll } from "@/hooks";
import setModalConfig from "./setModal";
import { Icon } from "@/components";
import { FloatButtonWrapper } from "./styled";
import { useNavigate } from "react-router-dom";

function FloatButton() {
  const { top } = useScroll();

  const navigate = useNavigate();

  const { modal } = App.useApp();

  const { store, dispatch } = useRedux();

  const action = [
    {
      icon: <Icon type="icon-shouye1" />,
      message: "首页",
      onclick: () => {
        navigate("/home");
      },
    },
    // {
    //   icon: <Icon type="icon-jiqiren" />,
    //   message: "ChatGpt",
    //   onclick: () => {
    //     navigate("/chatgpt");
    //   },
    // },
    {
      icon: <SettingOutlined />,
      message: "网站设置",
      onclick: () => {
        modal.confirm(setModalConfig);
      },
    },
    {
      icon: <Icon type={store.dark ? "icon-moon-fill" : "icon-sun_fill"} />,
      message: store.dark ? "开灯" : "关灯",
      onclick: () => {
        dispatch({ type: "CHANGE_DARK", payload: !store.dark });
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
