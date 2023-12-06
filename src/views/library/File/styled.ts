import { Plate } from "@/components";
import { r } from "@/utils";
import styled from "styled-components";

export const FileWrapper = styled.div`
  .fileTitle {
    font-weight: bold;
    font-size: 25px;
  }
  .fileList {
    color: var(--ant-primary-7) !important;
    cursor: pointer;
    font-size: 16px;
  }
  .fileList:hover {
    opacity: 0.8;
  }
  .year::before,
  .year::after {
    border-top-color: #999;
  }
  .count {
    font-size: 20px;
  }
`;
export const Title = styled.h2`
  margin: ${r`15px`} 0;
  padding-left: ${r`20px`};
  border-left: 5px solid var(--ant-primary-color);
  font-weight: 700;
`;
