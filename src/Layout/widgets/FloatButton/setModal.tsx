import { useRedux } from "@/hooks";
import { Switch, Button, ModalFuncProps } from "antd";
import { SetModalWrapper } from "./styled";

const theme = [
  { bg: 217, color: "#1890ff" },
  { bg: 125, color: "#25b864" },
  { bg: 0, color: "#d6324d" },
];

const Set = () => {
  const { store, dispatch } = useRedux();

  const { autoplay } = store;

  return (
    <SetModalWrapper>
      <li>
        <h4>播放背景音乐：</h4>
        <Switch
          checked={autoplay}
          defaultChecked
          onChange={() =>
            dispatch({ type: "CHANGE_AUTOPLAY", payload: !autoplay })
          }
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
        <Button
          type="primary"
          className="goAdmin"
          onClick={() => window.open("https://www.hyl999.co:81/#/home")}
        >
          进入网站后台管理
        </Button>
      </li>
    </SetModalWrapper>
  );
};

const setModalConfig: ModalFuncProps = {
  closable: false,
  okText: "确认",
  cancelText: "取消",
  title: "本站设置",
  onOk: () => window.location.reload(),
  content: <Set />,
  width: 600,
};

export default setModalConfig;
