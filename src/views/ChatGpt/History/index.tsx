import { HistoryList, HistoryWrapper } from "./styled";
import { Button, Tooltip } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { memo } from "react";
import Label from "./Label";
import useStore from "../store";

function History() {
  const dialogList = useStore((state) =>
    state.dialogList.sort((msg) => (msg.top ? -1 : 1))
  );
  const { createDialog } = useStore();

  return (
    <HistoryWrapper>
      <Button icon={<PlusOutlined />} onClick={createDialog}>
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
        {dialogList.map((item) => {
          return <Label {...item} />;
        })}
      </HistoryList>
    </HistoryWrapper>
  );
}

export default memo(History);
