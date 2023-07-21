import { Icon } from "@/components";
import { Input, Button } from "antd";
import { useState } from "react";
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

  return (
    <SearchWrapper inputWidth={inputWidth}>
      <div className="main">
        {inputWidth > 150 && <Button type="link">问gpt</Button>}
        <Input
          allowClear
          onFocus={() => setInputWidth(250)}
          onBlur={() => setInputWidth(150)}
          className="input"
          placeholder="输入关键字搜索"
        />
        <Button
          ghost
          className="onSearchBtn"
          icon={<Icon type="icon-Magnifier" />}
        ></Button>
      </div>
    </SearchWrapper>
  );
}

export default Search;
