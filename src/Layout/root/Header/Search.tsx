import { Icon } from "@/components";
import { Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchWrapper = styled.div<{ inputWidth: number }>`
  margin-left: auto;
  margin-right: 25px;
  position: relative;
  .main {
    display: inline-flex;
  }
  .input {
    width: ${(props) => `${props.inputWidth}px`};
    padding-right: 40px;
    background-color: ${({ theme }) =>
      theme.scrollTop > 1 ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"};
    .ant-input {
      background-color: transparent;
    }
  }
  .onSearchBtn {
    position: absolute;
    right: 0;
    top: calc(50% + 2px);
    transform: translateY(-50%);
    border: none;
    z-index: 10;
  }
`;

function Search() {
  const [inputWidth, setInputWidth] = useState(150);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onBlur = () => {
    if (value) return;
    setInputWidth(150);
  };
  const goSearch = () => {
    if (!value) return;
    navigate(`/search?q=${value}`);
  };

  const goGPT = () => {
    if (!value) return;
    navigate(`/resource/chatgpt?q=${value}`);
  };
  return (
    <SearchWrapper inputWidth={inputWidth}>
      <div className="main">
        {inputWidth > 150 && (
          <Button type="link" onClick={goGPT}>
            发给gpt
          </Button>
        )}
        <Input
          allowClear
          onFocus={() => setInputWidth(250)}
          onBlur={onBlur}
          className="input"
          placeholder="输入关键字搜索"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={goSearch}
        />
        <Button
          ghost
          className="onSearchBtn"
          icon={<Icon type="icon-Magnifier" />}
          onClick={goSearch}
        ></Button>
      </div>
    </SearchWrapper>
  );
}

export default Search;
