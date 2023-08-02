import { useBoolean } from "@/hooks";
import { LabelWrapper } from "./styled";
import { Icon } from "@/components";
import { memo, useRef, useState } from "react";
import { Input, InputRef } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import useStore from "../store";

function HistoryLabel({ id, current, time }) {
  const { deleteMessages, updateAllMessages } = useStore();

  const [editName, on, off] = useBoolean(false);

  const [value, setValue] = useState("");

  const inputRef = useRef<InputRef>(null);

  const onSaveName = () => {
    if (value) {
      updateAllMessages((item) => ({
        time: item.id === id ? value : item.time,
      }));
      off();
    }
  };

  return (
    <LabelWrapper
      onClick={() => updateAllMessages((msg) => ({ current: msg.id === id }))}
      active={current}
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
            onPressEnter={onSaveName}
          />
        ) : (
          <span>{time}</span>
        )}
        {current && !editName && <div className="zhao"></div>}
      </div>
      {current && (
        <ul className="action">
          {editName ? (
            <>
              <li>
                <CheckOutlined className="ico" onClick={onSaveName} />
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

                    setValue(time);
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
                    updateAllMessages((msg) => ({ top: msg.id === id }));
                  }}
                  type="icon-zhiding_o"
                />
              </li>
              <li>
                <Icon
                  className="ico"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMessages(id);
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
