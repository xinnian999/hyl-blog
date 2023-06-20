import { useRedux } from "@/hooks";
import { HistoryList, HistoryWrapper } from "./styled";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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

      <HistoryList>
        {allMessages.map((item, index) => {
          return <Label item={item} index={index} key={item.key} />;
        })}
      </HistoryList>
    </HistoryWrapper>
  );
}

export default memo(History);
