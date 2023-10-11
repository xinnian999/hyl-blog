import { Anchor, Comment, Icon, Markdown, Plate } from '@/components';
import { useGetData, useSetState, useWindowSize } from '@/hooks';
import { changeBlogTitle } from '@/utils';
import { CheckSquareOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Affix, Space, Tag } from 'antd';
import { time } from 'hyl-utils';
import { useMemo, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useParams } from 'react-router-dom';
import { addArticleVisits, queryAboutArticle } from '../api';
import ToolItem from './ToolItem';
import { AboutArticle, ArticleDetailWrapper, Main, Toolbar } from './styled';

function ArticleDetail() {
  const [{ info, targetOffset, anchorList, aboutArticle }, setState] =
    useSetState<ArticleDetailState>({
      info: {
        content: '',
        title: '这是一个文章的标题',
        createTime: time.parse(new Date()),
        visits: 0,
        updateTime: time.parse(new Date()),
        category: [],
      },
      targetOffset: 0,
      anchorList: [],
      aboutArticle: [],
    });

  const params = useParams();
  const mdRef: any = useRef(null);
  const size = useWindowSize();

  useGetData('/article/queryDetail', {
    data: { id: params.id },
    onSuccess: res => {
      const [data] = res.data;

      flushSync(() => {
        setState({ info: data });
      });

      //生成锚点
      setState({
        anchorList: [...mdRef.current.children[0].querySelectorAll('h2,h3')],
        targetOffset: window.innerHeight / 4,
      });

      //查询相关文章
      queryAboutArticle(data.category).then((res: any) => {
        setState({
          aboutArticle: res.data.filter(item => item.id !== Number(params.id)),
        });
      });

      // 设置页面标题
      changeBlogTitle('', data.title);

      // 文章阅读量+1
      setTimeout(() => {
        addArticleVisits({
          id: params.id,
          updateTime: time.parse(data.updateTime),
        });
      }, 3000);
    },
  });

  const { title, category, createTime, updateTime, content } = info;

  const articleInfo = useMemo(
    () => (
      <Space size={20} direction={size.width > 800 ? 'horizontal' : 'vertical'}>
        <span>
          {category.map((item: string) => (
            <Tag icon={<Icon type='icon-biaoqian2' />} color='pink' key={item}>
              {item}
            </Tag>
          ))}
        </span>
        <span>
          <Icon type='icon-fabu' /> 发布日期：
          {time.parse(createTime, 'YYYY-MM-DD')}
        </span>
        <span>
          <Icon type='icon-banbengengxin' /> 更新日期：
          {time.parse(updateTime, 'YYYY-MM-DD')}
        </span>
        <span>
          <Icon type='icon-word' /> 文章字数：
          {content.length > 1000
            ? `${~~(content.length / 100) / 10}k`
            : content.length}
        </span>
      </Space>
    ),
    [info, size]
  );

  return (
    <Plate title={title} hasBackgroundColor={false}>
      <ArticleDetailWrapper>
        <Main>
          <Markdown content={content} ref={mdRef} />
          <Comment
            articleId={params.id as string}
            title='评论区'
            btnName='提交评论'
          />
        </Main>

        <Toolbar>
          <Affix offsetTop={80}>
            <ToolItem title='目录' icon={<UnorderedListOutlined />}>
              <Anchor
                targetOffset={targetOffset}
                style={{ maxHeight: '40vh' }}
                anchorData={anchorList}
              />
            </ToolItem>
            <ToolItem title='相关阅读' icon={<CheckSquareOutlined />}>
              <AboutArticle>
                {aboutArticle.map(({ title, visits, comments, id }) => (
                  <div className='item' key={title}>
                    <div
                      className='item-title'
                      onClick={() => window.open(`/article/${id}`, '_self')}
                    >
                      {title}
                    </div>
                    <div className='item-info'>
                      {comments}评论 | {visits}阅读
                    </div>
                  </div>
                ))}
              </AboutArticle>
            </ToolItem>
          </Affix>
        </Toolbar>
      </ArticleDetailWrapper>
    </Plate>
  );
}

export default ArticleDetail;
