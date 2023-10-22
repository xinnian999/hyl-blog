import { ArticleCard, Plate } from '@/components';
import { useGetData } from '@/hooks';
import { Pagination, Space, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useRef } from 'react';

import {
  fetchData,
  onChangePage,
  onClickCategory,
  onClickOrderBy,
  onSearch,
} from './actions';
import useStore from './store';
import { ArticleListWrapper, FilterText } from './styled';

const { setState } = useStore;

const sortData = [
  {
    name: '日期',
    key: 'createTime',
  },
  {
    name: '浏览',
    key: 'visits',
  },
  {
    name: '点赞',
    key: 'like',
  },
  {
    name: '评论',
    key: 'comments',
  },
];

const ArticleList = () => {
  const { articleData, params, total, loading, value } = useStore();

  const listRef = useRef<HTMLDivElement>(null);

  const [tagData] = useGetData('/current/query/tag', {
    data: { filters: { belong: 'article' } },
  });

  const { pageNum, pageSize, filters } = params;

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <Plate title='文章列表' bg='bg23.jpg' hasBackgroundColor={false}>
      <ArticleListWrapper>
        <div className='bar'>
          <div className='search-bar'>
            <Search
              placeholder='输入关键词搜索文章'
              onSearch={onSearch}
              enterButton
              value={value}
              onChange={e => setState({ value: e.target.value })}
            />
          </div>
          <Space wrap size={16} className='filter-bar'>
            <div className='filter-type'>分类</div>
            <FilterText
              active={!filters.category}
              onClick={() => onClickCategory('')}
            >
              全部
            </FilterText>
            {tagData.map(({ name }) => (
              <FilterText
                active={filters.category === name}
                onClick={() => onClickCategory(name)}
                key={name}
              >
                {name}
              </FilterText>
            ))}
          </Space>

          <Space wrap size={16} className='filter-bar'>
            <div className='filter-type'>排序</div>
            {sortData.map(({ name, key }) => (
              <FilterText
                active={!!params.orderBys[key]}
                onClick={() => onClickOrderBy(key)}
                key={name}
              >
                {name}
              </FilterText>
            ))}
          </Space>
        </div>

        <div className='page-bar'>第{pageNum}页</div>

        <Spin spinning={loading}>
          <div className='articleList' ref={listRef}>
            {articleData.map(item => (
              <ArticleCard {...item} key={item.id} className='articleItem' />
            ))}
          </div>
        </Spin>

        <Pagination
          current={pageNum}
          pageSize={pageSize}
          total={total}
          onChange={(pageNum, pageSize) =>
            onChangePage({ pageNum, pageSize, listRef })
          }
          pageSizeOptions={[5, 10, 20, 30]}
        />
      </ArticleListWrapper>
    </Plate>
  );
};

export default ArticleList;
