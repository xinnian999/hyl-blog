import { Plate, Preview } from '@/components';
import { useQuery } from '@/hooks';
import { Prism } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { NoteWrapper } from './styled';

type Data = {
  content: string;
  title: string;
  category: string;
  createTime: string;
  id: number;
};

export default function Index() {
  const { data } = useQuery<Data>({ url: '/note/query' });

  return (
    <Plate title='笔记' bg='bg16.jpg'>
      <NoteWrapper>
        {data.map(({ title, content, id }) => (
          <div className='note-item ' key={id}>
            <div className='note-item-content'>
              <p>{title}</p>
              <Preview title={title}>
                <Prism
                  style={tomorrow}
                  language={'xml'}
                  PreTag='div'
                  children={content}
                />
              </Preview>
            </div>
          </div>
        ))}
      </NoteWrapper>
    </Plate>
  );
}
