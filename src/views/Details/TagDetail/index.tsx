import { Icon, Plate } from '@/components';
import { useQuery } from '@/hooks';
import { List, Tag } from 'antd';
import { time } from 'hyl-utils';
import { useNavigate, useParams } from 'react-router-dom';
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

const TagDetail = () => {
  const { tagName = '' } = useParams();

  const navigate = useNavigate();

  const { data, loading } = useQuery<articleItem>({
    url: '/current/query/article',
    params: {
      filters: { tag: tagName },
      orderBys: {
        createTime: 'desc',
      },
    },
  });

  return (
    <Plate
      title={
        <div>
          <Icon type='icon-biaoqian2' /> {tagName}
        </div>
      }
      bg='bg15.jpg'
      description={`${data.length}篇`}
    >
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
    </Plate>
  );
};

export default TagDetail;
