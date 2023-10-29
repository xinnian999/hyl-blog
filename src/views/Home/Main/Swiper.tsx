import { useQuery } from '@/hooks';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';
import { SwiperWrapper } from './styled';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Swiper() {
  const navigate = useNavigate();

  const swiperRef: any = useRef(null);

  const { data } = useQuery<articleItem>({
    url: '/current/query/article',
    params: {
      pageNum: 1,
      pageSize: 5,
      filters: { publishBanner: 1 },
    },
  });

  return data.length ? (
    <SwiperWrapper
      pagination={{
        clickable: true,
        type: 'bullets',
        bulletClass: 'bullet',
        bulletActiveClass: 'bullet-active',
        bulletElement: 'div',
      }}
      navigation
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay
      ref={swiperRef}
      loop
    >
      {data.map(item => (
        <SwiperSlide
          className='SwiperSlide'
          onClick={() => navigate(`/article/${item.id}`)}
          key={item.id}
        >
          <div className='title'>{item.title}</div>
          <img src={`${globalConfig.remoteStaticUrl}/image/${item.picture}`} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  ) : null;
}

export default Swiper;
