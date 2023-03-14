import styled from "styled-components";
import { adaptation } from "@/utils";

interface Bubble {
  type: number;
}

const BubbleBox = styled.div<Bubble>`
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

// adaptation(BubbleBox);

export default BubbleBox;
