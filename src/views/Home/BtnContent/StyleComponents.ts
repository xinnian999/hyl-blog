import styled from "styled-components";
import backgroundImage from "@/assets/img/bingdundun.png";

export const BtnContentWapper = styled.div`
  display: flex;
  height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-attachment: fixed;
  color: #fff;
  justify-content: center;
  align-items: center;
`;
