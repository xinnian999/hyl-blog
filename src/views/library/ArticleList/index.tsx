import { Plate } from '@/components';
import { useGetData } from '@/hooks';
import {
  ArticleItem,
  ArticleListWrapper,
} from '@/views/library/ArticleList/styled';
import { Button, Pagination, Space, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import { time } from 'hyl-utils';
import { useEffect, useRef } from 'react';
import useStore from './store';

const ArticleList = () => {
  const {
    articleData,
    params,
    total,
    fetchData,
    pageChange,
    categoryChange,
    onSearch,
    loading,
  } = useStore();

  const listRef = useRef<HTMLDivElement>(null);

  const [tagData] = useGetData('/category/query', { data: { orderBys: '' } });

  const scroll = () => {
    if (
      document.documentElement.scrollTop >
      document.documentElement.scrollHeight * 0.5
    ) {
      const { top } = listRef.current!.getBoundingClientRect();

      window.scrollTo({
        top: top + document.documentElement.scrollTop - 250,
        behavior: 'smooth', // 平滑滚动
      });
    }
  };

  useEffect(() => {
    fetchData(scroll);
  }, [params]);

  const { pageNum, pageSize, filters } = params;

  return (
    <Plate title='文章列表'>
      <ArticleListWrapper>
        <div className='search-bar'>
          <Search
            placeholder='输入关键词搜索文章'
            onSearch={onSearch}
            enterButton
          />
        </div>

        <div className='category-bar'>
          <Space wrap>
            {tagData.map(({ name }) => (
              <Button
                type={filters.category === name ? 'primary' : 'default'}
                onClick={() => categoryChange(name)}
              >
                {name}
              </Button>
            ))}
          </Space>
        </div>

        <Spin spinning={loading}>
          <div className='articleList' ref={listRef}>
            {articleData.map(
              ({ title, picture, introduce, createTime, category }) => (
                <ArticleItem>
                  <img
                    className='image'
                    src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
                  />

                  <div className='info'>
                    <h2>{title}</h2>
                    <div className='introduce'>{introduce}</div>
                    <div className='last'>
                      <div className='time'>
                        {time.parse(createTime, 'YYYY-MM-DD')}
                      </div>
                      <div className='tags'>
                        <Space>{category.split(',').map(item => item)}</Space>
                      </div>
                    </div>
                  </div>
                </ArticleItem>
              )
            )}
          </div>
        </Spin>
        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={total}
          onChange={pageChange}
        />
      </ArticleListWrapper>
    </Plate>
  );
};

export default ArticleList;
