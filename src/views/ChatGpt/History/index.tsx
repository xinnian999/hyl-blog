import { useRedux } from "@/hooks";
import { HistoryList, HistoryWrapper } from "./styled";
import { Button, Tooltip } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { memo } from "react";
import Label from "./Label";

function History() {
  const {
    store: {
      chatgptStore: { allMessages },
    },
    dispatch,
  } = useRedux();

  const onAdd = () => {
    dispatch({ type: "ADD_MESSAGES" });
  };

  return (
    <HistoryWrapper>
      <Button icon={<PlusOutlined />} onClick={onAdd}>
        新建会话
      </Button>

      <Tooltip title="初始化">
        <Button
          size="small"
          icon={<RedoOutlined />}
          className="refresh"
          onClick={() => {
            localStorage.clear();

            window.location.reload();
          }}
        />
      </Tooltip>

      <HistoryList>
        {allMessages.map((item, index) => {
          return <Label item={item} index={index} key={item.key} />;
        })}
      </HistoryList>
    </HistoryWrapper>
  );
}

export default memo(History);
