import { Icon } from '@/components';
import { useQuery } from '@/hooks';
import { List, Tag } from 'antd';
import { time } from 'hyl-utils';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled(List.Item)`
  padding: 15px 20px !important;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--ant-primary-4);
    color: #fff;
  }
  .title {
    font-size: 16px;
  }
`;

interface Props {
  tag: string;
}

const TagDetailArticle: React.FC<Props> = ({ tag }) => {
  const { data, loading } = useQuery<articleItem>({
    url: '/current/query/article',
    params: {
      filters: { tag },
      orderBys: {
        createTime: 'desc',
      },
    },
  });

  const navigate = useNavigate();

  return (
    <List
      dataSource={data}
      itemLayout='vertical'
      loading={loading}
      renderItem={item => (
        <Item
          onClick={() => navigate(`/article/${item.id}`)}
          extra={
            <>
              <span>
                {item.tag.split(',').map(t => (
                  <Tag
                    icon={<Icon type='icon-biaoqian2' />}
                    color='pink'
                    key={t}
                    bordered={false}
                    onClick={() => navigate(`/tag/${t}/article`)}
                  >
                    {t}
                  </Tag>
                ))}
              </span>
              <span>{time.parse(item.createTime, 'YYYY-MM-DD')}</span>
            </>
          }
        >
          <span className='title'>{item.title}</span>
        </Item>
      )}
    />
  );
};

export default TagDetailArticle;
