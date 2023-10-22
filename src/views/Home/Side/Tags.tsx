import { useGetData, useMount } from '@/hooks';
import { Affix, Tag } from 'antd';
import { useState } from 'react';
import { SideItem } from './styled';

const color = [
  'magenta',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'geekblue',
  'purple',
  'processing',
  'success',
  'error',
  'warning',
];

const Tags = () => {
  const [tag] = useGetData('/current/query/tag');

  const [offsetTop, setOffsetTop] = useState(80);

  useMount(() => {
    const el = document.getElementById('Footer');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setOffsetTop(-999999);
      } else {
        setOffsetTop(80);
      }
    }, options);

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  });
  return (
    <Affix offsetTop={offsetTop}>
      <SideItem>
        <div className='tags'>
          {tag.map(item => (
            <Tag
              icon={item.count && <span className='count'>{item.count}</span>}
              key={item.name}
              className='tag'
              bordered={false}
              color={item.bg}
            >
              {item.name}
            </Tag>
          ))}
        </div>
      </SideItem>
    </Affix>
  );
};

export default Tags;
