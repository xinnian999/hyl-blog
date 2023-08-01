import { HistoryList, HistoryWrapper } from "./styled";
import { Button, Tooltip } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { memo } from "react";
import Label from "./Label";
import useStore from "../store";

function History() {
  const { allMessages, createMessages } = useStore();

  return (
    <HistoryWrapper>
      <Button icon={<PlusOutlined />} onClick={createMessages}>
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
