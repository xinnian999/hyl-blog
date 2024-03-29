import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "汉仪霹雳体简";
    src: url(${require('@/assets/font/汉仪霹雳体简.woff')});
    font-display: swap;
  }

  @font-face {
    font-family: "font";
    src: url(${require('@/assets/font/HarmonyOS_Sans_SC_Medium.subset.woff2')});
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #light {
    --background-color: #fff;
    --border-color: #fff;
    --highlight-background-color: var(--ant-primary-2);
    --plate-text-color: rgba(255, 255, 255);
    --box-shadow: -5px 3px 10px 0px rgb(5 5 5 / 15%);
    --home-background-color: #fff;
    --homeFoot-background-color: #011425;
  }

  #dark {
    --background-color: rgb(48, 48, 48, 0.5);
    --border-color: #303030;
    --highlight-background-color: var(--ant-primary-10);
    --plate-text-color: rgba(255, 255, 255, 0.85);
    --box-shadow: 0 1px 10px rgb(255 255 255 / 30%);

    --home-background-color: transparent;
    --homeFoot-background-color: transparent;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  html,
  body {
    --heart-width: 1280px;
    min-height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // height: auto !important;
    background-color: #374140 !important;
    position: relative;
    overflow-x: hidden;
    overflow-y: overlay;
  }

  #root {
    font-size: 16px;
    font-family: "font" !important;

    @media screen and (max-width: 500px) {
      font-size: 19px;
    }
    overflow: hidden;
  }

  #main {
    min-height: 100vh;
    margin-bottom: 50px;
  }

  .center {
    max-width: var(--heart-width);
    margin: 0 auto;
    position: relative;
    padding: 0 15px;
  }

  .box-shadow {
    box-shadow: 0 15px 35px rgb(50 50 93 / 10%), 0 5px 15px rgb(0 0 0 / 7%);
  }

  .primaryColor {
    color: var(--ant-primary-color);
  }

  .pointer {
    cursor: pointer;
  }

  #nprogress .bar {
    background: var(--ant-primary-color);
  }

  .infinite-scroll-component {
    overflow: visible !important;
  }

  .ant-modal-title {
    text-align: center;
  }

  p {
    margin-bottom: 1em;
  }

  .hover{
    &:hover{
      cursor: pointer; 
      opacity: 0.8;
    }
  }

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    background-color: #fff;
    // position: fixed;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: var(--ant-primary-color);
    background-image: -webkit-linear-gradient(45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent);
  }

`;
export default GlobalStyle;
