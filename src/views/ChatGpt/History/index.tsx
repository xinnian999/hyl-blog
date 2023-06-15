import { useRedux } from "@/hooks";
import { HistoryList } from "../styled";
import { Button, Menu, MenuProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Icon } from "@/components";
import { memo } from "react";

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
        label: (
          <div>
            {item.time}
            <Icon
              className="delete"
              onClick={(e) => {
                e.stopPropagation();

                dispatch({ type: "DELETE_MESSAGES", payload: item.key });
              }}
              type="icon-shanchu"
            />
          </div>
        ),
        key: item.key,
        icon: <Icon type="icon-changyonghuifu" size={16} />,
      } as MenuItem)
  );

  const messageChange = (item) => {
    dispatch({ type: "CHANGE_MESSAGES_CURRENT", payload: item.key });
  };

  const onAdd = () => {
    dispatch({ type: "ADD_MESSAGES" });
  };

  return (
    <HistoryList>
      <Button icon={<PlusOutlined />} onClick={onAdd}>
        新建会话
      </Button>
      <Menu
        onClick={messageChange}
        className="menu"
        mode="inline"
        theme="dark"
        items={items}
        selectedKeys={[allMessages.find((item) => item.current)?.key || ""]}
      />
      {/* <ul>
        {allMessages.map((item) => (
          <li>{item.time}</li>
        ))}
      </ul> */}
    </HistoryList>
  );
}

export default memo(History);
