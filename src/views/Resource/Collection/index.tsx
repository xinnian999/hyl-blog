import { LazyImage, Plate } from '@/components';
import { useQuery } from '@/hooks';
import { InsertRowAboveOutlined } from '@ant-design/icons';
import { time } from 'hyl-utils';
import { CollectionWrapper } from './styled';

type Data = {
  title: string;
  picture: string;
  link: string;
  autograph: string;
  loading: boolean;
  createTime: string;
  id: number;
};

export default function Collection() {
  const { data } = useQuery<Data>({
    url: '/current/query/collection',
  });

  return (
    <Plate title='珍藏'>
      <CollectionWrapper>
        {data.map(
          ({ picture, title, autograph, createTime, loading, link, id }) => (
            <div
              className='cardContainer'
              onClick={() => window.open(link)}
              key={id}
            >
              <div className='image'>
                <LazyImage
                  src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
                />
              </div>

              <div className='title'>{title}</div>
              <p className='autograph'>{autograph}</p>
              <div className='time'>
                <InsertRowAboveOutlined className='iconAbove' />
                <span>{time.parse(createTime, 'YYYY-MM')}</span>
              </div>
            </div>
          )
        )}
      </CollectionWrapper>
    </Plate>
  );
}
