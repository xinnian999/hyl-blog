import { Plate } from "@/components";
import styled from "styled-components";

export const JournalWrapper = styled.div`
  padding: 60px 40px;

  .ant-timeline-item-tail {
    border-color: #d7e4ed;
    border-width: 5px;
  }

  .content {
    text-align: left;
  }

  img {
    width: 100%;
  }

  .dot {
    width: 60px;
    height: 60px;
    line-height: 70px;
    border-radius: 50%;
    box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgb(0 0 0 / 8%),
      0 3px 0 4px rgb(0 0 0 / 5%);

    text-align: center;
    position: relative;
    left: 1px;

    .dot-icon {
      color: #fff;
      font-size: 25px;
    }
  }

  .tupian {
    background-color: #75ce66;
  }

  .weizhi {
    background-color: #f0ca45;
  }

  .shipin {
    background-color: #c03b44;
  }

  .Journal-time {
    margin: 0 50px;
    font-size: 20px;
  }

  .timeline-item {
    background-color: #eee;
  }

  .ant-timeline-item-head {
    background-color: transparent !important;
  }

  .Journal-time-iphone {
    margin-top: 10px;
    text-align: right;
  }
`;

interface BubbleProps {
  type: number;
}

export const Bubble = styled.div<BubbleProps>`
  background-color: #484348;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 50px;
  margin-left: 40px;
  display: inline-block;
  position: relative;
  border-radius: 8px;
  color: #fff;
  ::before {
    position: absolute;
    ${(props) => (props.type ? "right" : "left")}:-20px;
    top: 6px;
    height: 0;
    width: 0;
    content: "";
    border: 10px solid rgba(255, 255, 255, 0);
    border-top: 6px solid rgba(255, 255, 255, 0);
    border-bottom: 6px solid rgba(255, 255, 255, 0);
    ${(props) => `border-${props.type ? "left" : "right"}-color`}: #484348;
  }
`;
