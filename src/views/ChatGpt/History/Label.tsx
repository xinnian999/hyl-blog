import { useBoolean, useRedux } from "@/hooks";
import { LabelWrapper } from "./styled";
import { Icon } from "@/components";
import { memo, useState } from "react";
import { Input } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function HistoryLabel({ item }) {
  const {
    store: {
      chatgptStore: { allMessages },
    },
    dispatch,
  } = useRedux();

  const [editName, on, off] = useBoolean(false);

  const [value, setValue] = useState("");

  return (
    <LabelWrapper
      onClick={() =>
        dispatch({ type: "CHANGE_MESSAGES_CURRENT", payload: item.key })
      }
      active={item.current}
    >
      <span>
        {editName ? (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        ) : (
          <div>
            <Icon type="icon-changyonghuifu" size={16} />
            <span>{item.time}</span>
          </div>
        )}
      </span>
      <div className="action">
        {editName ? (
          <>
            <CheckOutlined
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                if (value) {
                  dispatch({
                    type: "CHANGE_NAME",
                    payload: { key: item.key, name: value },
                  });
                  off();
                }
              }}
            />
            <CloseOutlined
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                off();
              }}
            />
          </>
        ) : (
          <>
            <Icon
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                on();
                setValue(item.time);
              }}
              type="icon-zhongmingming"
            />
            <Icon
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "DELETE_MESSAGES", payload: item.key });
              }}
              type="icon-zhiding_o"
            />
            <Icon
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "DELETE_MESSAGES", payload: item.key });
              }}
              type="icon-shanchu"
            />
          </>
        )}
      </div>
    </LabelWrapper>
  );
}

export default memo(HistoryLabel);
