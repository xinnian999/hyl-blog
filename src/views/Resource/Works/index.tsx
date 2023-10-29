import { Plate } from '@/components';
import { useQuery } from '@/hooks';
import { WorkWrapper } from './styled';

type Data = {
  name: string;
  picture: string;
  link: string;
  autograph: string;
  loading: boolean;
  id: number;
};

export default function Works() {
  const { data } = useQuery<Data>({
    url: '/current/query/works',
  });

  return (
    <Plate title='个人作品' bg='bg15.jpg'>
      <WorkWrapper>
        {data.map(({ name, picture, link, autograph, loading, id }) => (
          <div
            className='item'
            style={{
              backgroundImage: `url(${`${globalConfig.remoteStaticUrl}/image/${picture}`})`,
              backgroundSize: 'cover',
            }}
            onClick={() => window.open(link)}
            key={id}
          >
            <div className='title'>{name}</div>
            <hr />
            <div className='autograph'>{autograph}</div>
          </div>
        ))}
      </WorkWrapper>
    </Plate>
  );
}
