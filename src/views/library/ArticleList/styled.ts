import styled from 'styled-components';

export const ArticleListWrapper = styled.div`
  padding: 25px 12vw;

  .search-bar {
    padding: 0 150px;
  }
  .category-bar {
    margin: 30px 0;
  }
`;

export const ArticleItem = styled.div`
  border-radius: 10px;
  display: flex;
  margin: 0 auto;
  height: 200px;
  margin-bottom: 20px;

  .image {
    height: 180px;
    width: 30%;
    border-radius: 15px;
    display: block;
  }

  .info {
    //flex: 1;
    width: 70%;
    height: 100%;
    margin-left: 20px;
    padding: 15px 0;

    h2 {
      transition: 0.7s all;

      cursor: pointer;
      color: #3c4858;
      &:hover {
        color: var(--ant-primary-color);
      }
    }

    .introduce {
      margin-top: 10px;
    }

    .last {
      .time {
        margin-right: 20px;
      }

      display: flex;
      margin-top: 40px;
    }
  }
`;
