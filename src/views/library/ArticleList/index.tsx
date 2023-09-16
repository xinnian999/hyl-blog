import { Plate } from '@/components';
import {
  ArticleItem,
  ArticleListWrapper,
} from '@/views/library/ArticleList/styled';
import { Affix, Button, Pagination, Space } from 'antd';
import { time } from 'hyl-utils';
import { useEffect } from 'react';

import { useGetData } from '@/hooks';
import useStore from './store';

const ArticleList = () => {
  const { articleData, params, total, fetchData, pageChange, categoryChange } =
    useStore();

  const [tagData] = useGetData('/category/query');

  useEffect(() => {
    fetchData();
  }, [params]);

  const { pageNum, pageSize, filters } = params;

  return (
    <Plate title='文章列表'>
      <Affix offsetTop={80}>
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
      </Affix>
      <ArticleListWrapper>
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
