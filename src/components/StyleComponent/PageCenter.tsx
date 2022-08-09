import styled from "styled-components";
import r from "./r";

interface isPageCenter {
  bgc?: string;
}

const PageCenter = styled.div<isPageCenter>`
  max-width: ${r`1280px`};
  margin: 20px auto;
  background-color: ${(props) => props.bgc};
  @media screen and (max-width: 800px) {
    padding: 0 ${r`20px`};
  }
`;

export default PageCenter;
