import { Plate } from "@/components";
import styled from "styled-components";

export const NoteWrapper = styled.div`
  overflow: hidden;
  padding: 10px;

  columns: 4;

  @media screen and (max-width: 1200px) {
    column-count: 3;
  }

  @media screen and (max-width: 950px) {
    column-count: 2;
  }

  @media screen and (max-width: 650px) {
    column-count: 1;
  }

  p {
    font-size: 15px;
    font-weight: bold;
  }
  .note-item {
    display: inline-block;
    vertical-align: top;
    width: 300px;
    @media screen and (max-width: 650px) {
      width: 100%;
    }
    margin-bottom: 15px;
    padding: 5px;
    text-align: center;
    &-content {
      padding: 10px;
      background-color: var(--highlight-background-color);
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }
  }

  @media screen and (max-width: 800px) {
    .animate__fadeInUp {
      margin-right: 0;
    }
  }
`;
