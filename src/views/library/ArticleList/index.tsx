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
import { useNavigate } from 'react-router-dom';
import useStore from './store';

const ArticleList = () => {
  const {
    articleData,
    params,
    total,
    fetchData,
    paramsChange,
    categoryChange,
    onSearch,
    loading,
  } = useStore();

  const listRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const [tagData] = useGetData('/category/query', { data: { orderBys: '' } });

  const { pageNum, pageSize, filters } = params;

  useEffect(() => {
    fetchData();
  }, [params]);

  const pageChange = (pageNum: number) => {
    paramsChange({ pageNum });
    //TODO:未实现异步滚动（等接口加载完且渲染完dom，尝试监听pageNum但页面挂载完成时必定执行一次滚动）
    // 滚动回列表顶部
    window.scrollTo({
      top:
        listRef.current!.getBoundingClientRect().top +
        document.documentElement.scrollTop -
        250,
      behavior: 'smooth', // 平滑滚动
    });
  };

  return (
    <Plate title='文章列表' bg='bg23.jpg'>
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
              ({ title, picture, introduce, createTime, category, id }) => (
                <ArticleItem>
                  <img
                    className='image'
                    src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
                  />

                  <div className='info'>
                    <h2 onClick={() => navigate(`/article/${id}`)}>{title}</h2>
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
