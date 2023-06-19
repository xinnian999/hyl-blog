import { useRedux } from "@/hooks";
import { HistoryList, HistoryWrapper } from "./styled";
import { Button, Menu, MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { memo } from "react";
import Label from "./Label";

type MenuItem = Required<MenuProps>["items"][number];

function History() {
  const {
    store: {
      chatgptStore: { allMessages },
    },
    dispatch,
  } = useRedux();

  const items = allMessages.map(
    (item) =>
      ({
        label: <Label item={item} />,
        key: item.key,
        // icon: <Icon type="icon-changyonghuifu" size={16} />,
      } as MenuItem)
  );

  const messageChange = (item) => {
    dispatch({ type: "CHANGE_MESSAGES_CURRENT", payload: item.key });
  };

  const onAdd = () => {
    dispatch({ type: "ADD_MESSAGES" });
  };

  return (
    <HistoryWrapper>
      <Button icon={<PlusOutlined />} onClick={onAdd}>
        新建会话
      </Button>
      {/* <Menu
        onClick={messageChange}
        className="menu"
        mode="inline"
        theme="dark"
        items={items}
        selectedKeys={[allMessages.find((item) => item.current)?.key || ""]}
      /> */}

      <HistoryList>
        {allMessages.map((item) => {
          return <Label item={item} />;
        })}
      </HistoryList>
    </HistoryWrapper>
  );
}

export default memo(History);
