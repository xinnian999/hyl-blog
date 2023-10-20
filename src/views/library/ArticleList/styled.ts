import styled from 'styled-components';

export const ArticleListWrapper = styled.div`
  .bar {
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    box-shadow: var(--box-shadow);
  }
  .page-bar {
    padding: 10px;
  }
  .articleList {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    .articleItem {
      width: calc(25% - 12px);
      margin-bottom: 15px;
      margin-right: 15px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:last-child {
        margin-right: auto;
      }
    }
  }

  .search-bar {
    padding: 0 150px;
    margin-bottom: 20px;
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
  color: ${({ active }) => (active ? 'var(--ant-primary-color)' : '#666')};
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
  padding: 10px 0;

  .image {
    height: 100%;
    width: 30%;
    border-radius: 15px;
    display: block;
  }

  .info {
    width: 70%;
    height: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0;
    .top {
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

      .tags {
        font-size: 13px;
      }
    }

    .last {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 13px;
      .time {
        margin-right: 20px;
      }
    }
  }
`;
