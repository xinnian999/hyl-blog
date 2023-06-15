import { useGetData } from "@/hooks";
import { SwiperWrapper } from "./styled";
import { SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Main() {
  const navigate = useNavigate();

  const swiperRef: any = useRef(null);

  const [data] = useGetData<articleItem>("/article/query", {
    progress: false,
    data: {
      pageNum: 1,
      pageSize: 5,
      filters: { publishBanner: 1 },
    },
  });

  return data.length ? (
    <SwiperWrapper
      pagination={{
        clickable: true,
        type: "bullets",
        bulletClass: "bullet",
        bulletActiveClass: "bullet-active",
        bulletElement: "div",
      }}
      navigation
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay
      ref={swiperRef}
      loop
    >
      {data.map((item) => {
        return (
          <SwiperSlide
            className="SwiperSlide"
            onClick={() => navigate(`/article/${item.id}`)}
            key={item.id}
          >
            <div className="title">{item.title}</div>
            <img
              src={`${globalConfig.remoteStaticUrl}/image/${item.picture}`}
            />
          </SwiperSlide>
        );
      })}
    </SwiperWrapper>
  ) : null;
}

export default Main;
