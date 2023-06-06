import { r } from "@/utils";
import { Alert } from "antd";
import styled from "styled-components";

export const ArticleContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 32%;
    margin-bottom: 20px;
  }
`;

export const ArticleCardWrapper = styled.div`
  background-color: var(--background-color);
  position: relative;
  transition: 0.7s all;
  border: 1px solid var(--border-color);
  border-radius: 15px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  &:hover .introduce {
    color: var(--ant-primary-color);
  }
  &:hover .image {
    transform: scale(1.2);
  }

  .topping {
    position: absolute;
    height: 20px;
    line-height: 20px;
    text-align: center;
    width: 74px;
    background-color: #ff5722;
    color: #fff;
    transform: rotate(-45deg);
    left: -18px;
    top: 9px;
    z-index: 5;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ArticleCardImage = styled.div`
  height: 220px;
  width: 100%;
  border: var(--border-color);
  overflow: hidden;
  z-index: 2;
  position: relative;
  color: #fff;
  text-shadow: 0px 0px 10px black;
  font-size: 25px;
  display: grid;
  place-items: end start;
  background-color: #222;
  .image {
    width: 100%;
    height: 100%;
    opacity: 0.8;
    transition: 0.5s all;
  }
  .title {
    position: absolute;
    bottom: 0;
    left: 25px;
  }
`;

export const ArticleCardMain = styled.div`
  padding: 15px;

  .introduce {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 控制显示的行数 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 66px;
    transition: 0.5s all;
  }

  .more {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
`;

export const ArticleCardFooter = styled.div`
  padding: 10px 15px;
  border-top: 1px solid #eaeaea;
`;

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

export const AlertBanner = styled(Alert)`
  border-radius: 15px !important;
  margin-bottom: 20px !important;
`;

export const HomeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HomeMain = styled.div`
  width: 73%;
`;

export const HomeSide = styled.div`
  width: 25%;

  .item {
    background-color: #fff;
    border-radius: 15px;
    padding: 10px;
  }

  .avatar {
    padding: 20px 0;
    text-align: center;
  }

  .self {
    p {
      text-align: center;
      font-size: 16px;
    }
  }

  .links {
    display: flex;
    justify-content: space-around;
    padding: 0 15px;
    li {
      border: 1px solid #999;
      width: 45px;
      height: 45px;
      border-radius: 10px;
      font-size: 30px;
      text-align: center;
      line-height: 45px;
    }
  }
`;
