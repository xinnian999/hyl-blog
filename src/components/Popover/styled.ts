import { r } from "@/utils";
import styled from "styled-components";

export const PopoverFlag = styled.div`
  position: relative;

  &:hover .content {
    top: ${({ theme }) => (theme.scrollTop > 1 ? r`45px` : r`50px`)};
    display: block;
  }

  .content {
    min-width: 100px;
    font-size: 15px;
    text-align: left;
    line-height: 40px;
    padding: 5px 15px;
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    overflow: hidden;
    z-index: 99999;
    display: none;
    background-color: #fff;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 60px;
    border-radius: 10px;
    transition: 0.5s opacity;
    animation: fadeInUp;
    animation-duration: 0.3s;

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(-50%, 15px, 0);
      }

      to {
        opacity: 1;
        transform: translate3d(-50%, 0, 0);
      }
    }
  }
`;
