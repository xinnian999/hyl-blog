import { Icon } from "@/components";
import { Input, Button } from "antd";
import styled from "styled-components";

const SearchWrapper = styled.div`
  margin-left: auto;
  margin-right: 25px;
  position: relative;

  .main {
    /* display: inline-block; */
    position: relative;
  }
  .input {
    padding-right: 50px;
  }
  .onSearchBtn {
    position: absolute;
    right: 0;
    top: -5px;
  }
`;

function Search() {
  return (
    <SearchWrapper>
      <span className="main">
        <Input className="input" />
        <Button
          className="onSearchBtn"
          icon={<Icon type="icon-Magnifier" />}
        ></Button>
      </span>
    </SearchWrapper>
  );
}

export default Search;
