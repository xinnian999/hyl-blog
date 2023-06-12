import styled from "styled-components";
import { Swiper } from "swiper/react";

export const HomeMainWrapper = styled.div`
  width: 73%;
`;

export const ArticleWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 32%;
    margin-bottom: 20px;
  }

  .loadMore {
    height: 50px;
    width: 150px;
    color: #fff;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg, gold, deeppink);
    animation: hue 3s infinite linear;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: -15px;
      bottom: -15px;
      left: -15px;
      right: -15px;
      border: 5px solid #24acf2;
      border-image: linear-gradient(45deg, gold, deeppink) 1;
      clip-path: inset(0px round 10px);
      animation: clippath 3s infinite linear;
    }
    &::after {
      animation: clippath 3s infinite -1.5s linear;
    }
    span {
      color: white;
      font-size: 20px;
    }

    &:hover {
      animation: none;
    }
  }

  @keyframes hue {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  @keyframes clippath {
    0% {
      clip-path: inset(0 0 95% 0);
      filter: hue-rotate(0deg);
    }
    25% {
      clip-path: inset(0 95% 0 0);
    }
    50% {
      clip-path: inset(95% 0 0 0);
    }
    75% {
      clip-path: inset(0 0 0 95%);
    }
    100% {
      clip-path: inset(0 0 95% 0);
      filter: hue-rotate(360deg);
    }
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
  animation: zoomIn;
  animation-duration: 1s;
  &:hover .title {
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
  height: 160px;
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
    /* opacity: 0.8; */
    transition: 0.5s all;
  }
`;

export const ArticleCardMain = styled.div`
  padding: 15px;
  /* font-size: 14px; */
  .title {
    height: 50px;
    transition: 0.5s all;
    font-weight: bold;
    color: #4e5358;
    font-size: 16px;
  }

  .more {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #363636;
  }
`;

export const ArticleCardFooter = styled.div`
  padding: 10px 15px;
  border-top: 1px solid #eaeaea;
`;

export const SwiperWrapper = styled(Swiper)`
  margin-bottom: 20px;
  border-radius: 15px;
  height: 400px;

  .swiper-pagination {
    bottom: 0 !important;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 15px;
  }
  .bullet {
    width: 15px;
    height: 15px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    margin-left: 10px;
    background: rgba(255, 255, 255, 0.4);
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  .bullet-active {
    background-color: #fff;
    border: 5px solid rgba(0, 0, 0, 0.5);
    box-sizing: content-box;
  }
  .swiper-button-prev {
    height: 80px;
    background-color: rgba(0, 0, 0, 0.2);
    width: 40px;
    left: 0;
    transform: translateY(-50%);
  }

  .swiper-button-next {
    height: 80px;
    background-color: rgba(0, 0, 0, 0.2);
    width: 40px;
    right: 0;
    transform: translateY(-50%);
  }

  .SwiperSlide {
    width: 100%;
    position: relative;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 5px 10px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
