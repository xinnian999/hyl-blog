import { r } from "@/utils";
import { Alert } from "antd";
import styled from "styled-components";

export const BannerTextWrapper = styled.div`
  margin-top: 80px;
  .autograph {
    font-size: ${r`25px`};
    text-shadow: 0px 0px 10px black;
    &-cursor {
      animation: shanxian 2000ms infinite;
    }
    @keyframes shanxian {
      from {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .play {
    margin-top: 100px;

    .main {
      width: 300px;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      .btn {
        padding: 0 25px;
        height: 45px;
        /* line-height: 45px; */
        border-radius: 30px;

        .ico {
          font-size: 16px;
        }
      }
    }
  }
`;

export const Notice = styled(Alert)`
  border-radius: 15px !important;
  margin-bottom: 20px !important;
`;

export const HomeMain = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Foot = styled.div``;
