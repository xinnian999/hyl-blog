import { Tooltip } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { useRootStore, useScroll } from "@/hooks";
import { Icon } from "@/components";
import { FloatButtonWrapper } from "./styled";

function FloatButton() {
  const { top } = useScroll();

  const { theme, setGlobalState } = useRootStore();

  const action = [
    {
      icon: (
        <Icon type={theme === "dark" ? "icon-moon-fill" : "icon-sun_fill"} />
      ),
      message: theme === "dark" ? "开灯" : "关灯",
      onclick: () => {
        setGlobalState({ theme: theme === "dark" ? "light" : "dark" });
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
