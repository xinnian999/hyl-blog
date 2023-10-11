import { ArticleCard } from '@/components';
import { useBoolean, useGetData, useSetState } from '@/hooks';
import { Divider, Spin } from 'antd';
import Swiper from './Swiper';
import { ArticleWrapper, HomeMainWrapper } from './styled';

function Main() {
  const [state, setState] = useSetState({
    pageNum: 1,
    category: 'all',
    total: 10,
  });

  const [loading, on, off] = useBoolean(true);

  const [articleData, run] = useGetData<articleItem>('/current/query/article', {
    cache: true,
    data: {
      pageNum: state.pageNum,
      pageSize: 18,
      filters: { publish: 1 },
      orderBys: { topping: 'desc', createTime: 'desc' },
    },
    onSuccess(res) {
      setState({
        total: res.total,
        pageNum: state.pageNum + 1,
      });
      off();
    },
  });

  const queryArticle = () => {
    on();
    run();
  };

  return (
    <HomeMainWrapper>
      <Swiper />
      <ArticleWrapper>
        {articleData.map(item => (
          <div className='item' key={item.id}>
            <ArticleCard {...item} />
          </div>
        ))}
        <Divider plain className='article-footer'>
          {loading ? (
            <Spin />
          ) : articleData.length < state.total ? (
            <div className='loadMore' onClick={queryArticle}>
              点击加载更多
            </div>
          ) : (
            <Divider plain className='article-footer'>
              没有更多文章了 ---- 🤐
            </Divider>
          )}
        </Divider>
      </ArticleWrapper>
    </HomeMainWrapper>
  );
}

export default Main;
