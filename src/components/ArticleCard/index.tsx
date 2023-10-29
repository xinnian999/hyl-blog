import { IconText } from '@/components';
import Icon from '@/components/Basic/Icon';
import { Space, Tag, Tooltip } from 'antd';
import { time } from 'hyl-utils';
import { useNavigate } from 'react-router-dom';
import {
  ArticleCardFooter,
  ArticleCardImage,
  ArticleCardMain,
  ArticleCardWrapper,
} from './styled';

interface ArticleCardProps extends Item {
  title: string;
  tag: string;
  category: string;
  introduce: string;
  content: string;
  picture: string;
  type: number;
  visits: number;
  comments: number;
  publish: number;
  topping: number;
  className?: string;
}

function ArticleCard(props: ArticleCardProps) {
  const {
    title,
    id,
    comments,
    visits,
    tag,
    createTime,
    picture,
    topping,
    className,
    category,
  } = props;

  const navigate = useNavigate();

  return (
    <ArticleCardWrapper className={className} key={id}>
      {topping === 1 && <div className='topping'>置顶</div>}
      <div className='content' onClick={() => navigate(`/article/${id}`)}>
        <ArticleCardImage>
          <img
            className='image'
            src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
          />
        </ArticleCardImage>

        <ArticleCardMain>
          <div className='title'>{title}</div>
          <div className='more'>
            <IconText icon='icon-shijian' size={16}>
              {' '}
              {time.parseFrom(createTime)}
            </IconText>
            <Space>
              <IconText icon='icon-changyonghuifu' size={16}>
                {comments}
              </IconText>
              <IconText icon='icon-chakan' size={16}>
                {visits}
              </IconText>
            </Space>
          </div>
        </ArticleCardMain>
      </div>

      <ArticleCardFooter>
        <Tag icon={<Icon type='icon-wenjianjia' />} color='orange'>
          {category}
        </Tag>
        {tag.split(',').map(t => (
          <Tooltip key={t} title='点击查看此标签更多文章'>
            <Tag
              className='hover'
              icon={<Icon type='icon-biaoqian2' />}
              color='pink'
              bordered={false}
              onClick={() => navigate(`/tag/${t}`)}
            >
              {t}
            </Tag>
          </Tooltip>
        ))}
      </ArticleCardFooter>
    </ArticleCardWrapper>
  );
}

export default ArticleCard;
