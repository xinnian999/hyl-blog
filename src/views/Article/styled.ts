import { Plate } from "@/components";
import styled from "styled-components";

export const ArticleMain = styled(Plate.Main)`
  background-color: transparent;
  box-shadow: none;
  border: none;
`;

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
