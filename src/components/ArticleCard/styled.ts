import styled from 'styled-components';

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
  .content {
    &:hover {
      cursor: pointer;
    }
    &:hover .title {
      color: var(--ant-primary-color);
    }

    &:hover .image {
      transform: scale(1.2);
    }
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
