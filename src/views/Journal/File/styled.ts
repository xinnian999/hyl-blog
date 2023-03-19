import { Plate } from "@/components";
import styled from "styled-components";

export const FileWrapper = styled(Plate.Main)`
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
