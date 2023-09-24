import { Icon, Plate } from '@/components';
import { useGetData } from '@/hooks';
import { ArticleListWrapper } from '@/views/library/ArticleList/styled';
import { Button, Pagination, Space, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useRef } from 'react';
import ArticleCard from './ArticleCard';
import useStore from './store';

const { setState } = useStore;

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
    value,
  } = useStore();

  const listRef = useRef<HTMLDivElement>(null);

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

  const reload = () => {
    paramsChange({ filters: {} });
    setState({ value: '' });
  };

  const currentFilter = filters.title || filters.category;

  return (
    <Plate title='文章列表' bg='bg23.jpg'>
      <ArticleListWrapper>
        <div className='search-bar'>
          <Search
            placeholder='输入关键词搜索文章'
            onSearch={onSearch}
            enterButton
            value={value}
            onChange={e => setState({ value: e.target.value })}
          />
        </div>

        <div className='category-bar'>
          <Space wrap>
            {tagData.map(({ name }) => (
              <Button
                type={filters.category === name ? 'primary' : 'default'}
                onClick={() => categoryChange(name)}
                key={name}
              >
                {name}
              </Button>
            ))}
          </Space>
        </div>

        {currentFilter && (
          <div className='filter'>
            {currentFilter}：{' '}
            <Button
              icon={<Icon type='icon-zhongzhi' />}
              size='small'
              onClick={reload}
            />
          </div>
        )}

        <Spin spinning={loading}>
          <div className='articleList' ref={listRef}>
            {articleData.map(item => (
              <ArticleCard {...item} key={item.id} />
            ))}
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
