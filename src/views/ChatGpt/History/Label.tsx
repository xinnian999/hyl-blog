import { useBoolean, useRedux } from "@/hooks";
import { LabelWrapper } from "./styled";
import { Icon } from "@/components";
import { memo, useRef, useState } from "react";
import { Input, InputRef } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function HistoryLabel({ item, index }) {
  const { dispatch } = useRedux();

  const [editName, on, off] = useBoolean(false);

  const [value, setValue] = useState("");

  const inputRef = useRef<InputRef>(null);

  const onSave = () => {
    if (value) {
      dispatch({
        type: "CHANGE_NAME",
        payload: { key: item.key, name: value },
      });
      off();
    }
  };

  return (
    <LabelWrapper
      onClick={() =>
        dispatch({ type: "CHANGE_MESSAGES_CURRENT", payload: item.key })
      }
      active={item.current}
    >
      <div className="icon">
        <Icon type="icon-changyonghuifu" size={16} />
      </div>
      <div className="name">
        {editName ? (
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={onSave}
          />
        ) : (
          <span>{item.time}</span>
        )}
        {item.current && !editName && <div className="zhao"></div>}
      </div>
      {item.current && (
        <ul className="action">
          {editName ? (
            <>
              <li>
                <CheckOutlined className="ico" onClick={onSave} />
              </li>
              <li>
                <CloseOutlined
                  className="ico"
                  onClick={(e) => {
                    e.stopPropagation();
                    off();
                  }}
                />
              </li>
            </>
          ) : (
            <>
              <li>
                <Icon
                  className="ico"
                  onClick={(e) => {
                    e.stopPropagation();
                    on();

                    setValue(item.time);
                    setTimeout(() => {
                      inputRef.current!.focus({
                        cursor: "end",
                      });
                    });
                  }}
                  type="icon-zhongmingming1"
                />
              </li>
              <li>
                <Icon
                  className="ico"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "CHANGE_TOP", payload: item });
                  }}
                  type="icon-zhiding_o"
                />
              </li>
              <li>
                <Icon
                  className="ico"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "DELETE_MESSAGES", payload: item.key });
                  }}
                  type="icon-shanchu"
                />
              </li>
            </>
          )}
        </ul>
      )}
    </LabelWrapper>
  );
}

export default memo(HistoryLabel);
