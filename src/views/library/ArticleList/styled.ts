import styled from 'styled-components';

export const ArticleListWrapper = styled.div`
  padding: 25px 12vw;

  .search-bar {
    padding: 0 150px;
    margin-bottom: 35px;
  }

  .filter-bar {
    width: 100%;
    margin-bottom: 20px;
    .filter-type {
      font-size: 14px;
      width: 40px;
      border-right: 1px solid #999;
    }
  }
`;

export const FilterText = styled.div<{ active: boolean }>`
  color: ${({ active }) => (active ? 'var(--ant-primary-color)' : '#999')};
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: var(--ant-primary-4);
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
      margin-top: 50px;
    }
  }
`;
