import React from 'react';
import { Plate } from '@/components';
import { useGetData } from '@/hooks';
import {
  ArticleItem,
  ArticleListWrapper,
} from '@/views/library/ArticleList/styled';
import { time } from 'hyl-utils';
import { Space } from 'antd';

const ArticleList = () => {
  const [articleData, run] = useGetData<articleItem>('/article/query', {
    data: {
      pageNum: 1,
      pageSize: 10,
      filters: { publish: 1 },
      orderBys: 'topping desc,id desc',
    },
    onSuccess(res) {},
  });

  return (
    <Plate title="文章列表">
      <ArticleListWrapper>
        {articleData.map(
          ({ title, picture, introduce, createTime, category }) => (
            <ArticleItem>
              <img
                className="image"
                src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
              />

              <div className="info">
                <h2>{title}</h2>
                <div className="introduce">{introduce}</div>
                <div className="last">
                  <div className="time">
                    {time.parse(createTime, 'YYYY-MM-DD')}
                  </div>
                  <div className="tags">
                    <Space>{category.split(',').map((item) => item)}</Space>
                  </div>
                </div>
              </div>
            </ArticleItem>
          )
        )}
      </ArticleListWrapper>
    </Plate>
  );
};

export default ArticleList;
