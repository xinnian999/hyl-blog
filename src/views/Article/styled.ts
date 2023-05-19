import { Plate } from "@/components";
import styled from "styled-components";

export const ArticleMain = styled(Plate.Main)`
  background-color: transparent;
  box-shadow: none;
  border: none;
`;

export const ArticleSkeleton = styled.div`
  display: flex;
  height: 220px;
  background-color: var(--background-color);
  padding: 15px;
  border-radius: 10px;
  .image {
    width: 250px !important;
    height: 100% !important;
    margin-right: 10px;
  }
`;

export const ArticleCardWrapper = styled.div`
  padding: 25px;
  background-color: var(--background-color);
  position: relative;
  transition: 0.7s all;
  border: 1px solid var(--border-color);
  border-radius: 15px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  animation: zoomIn;
  animation-duration: 1s;
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
  }

  .time {
    position: absolute;
    right: 0;
    top: 0;
  }

  .title {
    width: calc(100% - 90px);
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid #e8e9e7;

    span {
      font-size: 16px;
      font-weight: 400;
      display: inline-block;
      color: #2ea7e0;
    }
  }

  .content {
    margin: 20px 0 0 0;
    line-height: 28px;
    position: relative;
    min-height: 200px;
    border-bottom: 1px solid #e8e9e7;
    display: flex;
    @media screen and (max-width: 800px) {
      display: block;

      .content-box {
        margin: 0 !important;
      }

      .img-box {
        width: 90%;
      }
    }
    .img-box {
      width: 300px;
      height: 180px;
      border: var(--border-color);
      overflow: hidden;
      z-index: 9999;
    }

    .content-box {
      overflow: hidden;
      margin-left: 20px;
      flex: 1;
      text-overflow: ellipsis;
      display: -webkit-box;
      /* 限制在一个块元素显示的文本的行数 */
      -webkit-line-clamp: 2;
      /* 设置或检索伸缩盒对象的子元素的排列方式 */
      -webkit-box-orient: vertical;
    }
  }

  .toolbar {
    margin-top: 15px;

    .record {
      float: right;
      display: flex;

      .reply {
        margin-right: 10px;
      }
    }
  }

  &:hover {
    cursor: pointer;
    background-color: var(--highlight-background-color);
  }
`;

export const ArticleCategory = styled.div`
  .search {
    padding: 10px;
    background-color: gray;
  }

  .categoryList {
    padding-top: 20px;
    li {
      position: relative;
      height: 40px;
      line-height: 39px;
      position: relative;
      z-index: 1;
      margin-bottom: 2px;
      padding: 0 20px;
      cursor: pointer;
      &:hover {
        background-color: var(--highlight-background-color);
      }
    }

    .active {
      background-color: var(--highlight-background-color);

      &::after {
        content: "";
        height: 100%;
        width: 5px;
        background-color: #555;
        position: absolute;
        right: -1px;
        top: 0;
      }
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  position: relative;
  .searchBtn {
    position: absolute;
    right: 0;
    height: 100%;
    width: 35px;
    background-color: var(--ant-primary-color);
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
  }
  .searchInput {
    width: 100%;
  }
`;
