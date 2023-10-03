import { IconText } from '@/components';
import { Space } from 'antd';
import { time } from 'hyl-utils';
import { useNavigate } from 'react-router-dom';
import { articleItem } from './store';
import { ArticleItem } from './styled';

const ArticleCard: React.FC<articleItem> = ({
  title,
  picture,
  introduce,
  createTime,
  category,
  visits,
  comments,
  id,
}) => {
  const navigate = useNavigate();

  return (
    <ArticleItem>
      <img
        className='image'
        src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
      />

      <div className='info'>
        <div className='top'>
          <h2 onClick={() => navigate(`/article/${id}`)}>{title}</h2>
          <div className='introduce'>{introduce}</div>
        </div>

        <div className='down'>
          <div className='tags'>
            <Space>
              {category.split(',').map(item => (
                <IconText size={14} icon='icon-biaoqian2' key={item}>
                  {item}
                </IconText>
              ))}
            </Space>
          </div>

          <div className='last'>
            <span className='time'>
              <IconText icon='icon-shijian1' size={16}>
                {time.parse(createTime, 'YYYY-MM-DD')}
              </IconText>
            </span>
            <Space className='count'>
              <IconText icon='icon-chakan' size={16}>
                {visits}
              </IconText>
              <IconText icon='icon-huifu' size={16}>
                {comments}
              </IconText>
            </Space>
          </div>
        </div>
      </div>
    </ArticleItem>
  );
};

export default ArticleCard;
