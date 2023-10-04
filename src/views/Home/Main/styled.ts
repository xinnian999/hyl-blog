import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const HomeMainWrapper = styled.div`
  width: 73%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const ArticleWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 32%;
    @media (max-width: 1200px) {
      width: 48%;
    }
    @media (max-width: 800px) {
      width: 100%;
    }

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
      content: '';
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
    cursor: pointer;
  }

  .bullet-active {
    background-color: #fff;
    border: 5px solid rgba(0, 0, 0, 0.5);
    box-sizing: content-box;
  }

  .swiper-button-prev,
  .swiper-button-next {
    height: 80px;
    background-color: rgba(0, 0, 0, 0.2);
    width: 40px;
    transform: translateY(-50%);
    color: var(--ant-primary-color);
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
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
