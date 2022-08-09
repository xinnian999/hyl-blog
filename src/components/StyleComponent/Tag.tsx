import styled from "styled-components";
import r from "./r";

const Tag = styled.span`
  background: rgba(27, 31, 35, 0.05);
  padding: ${r`5px`} ${r`10px`};
  color: var(--ant-primary-7);
  border-radius: 4px;
  font-family: Menlo, Monaco, Consolas, Courier New, monospace;
`;

export default Tag;
