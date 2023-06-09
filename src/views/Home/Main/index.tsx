import { Button, Divider, Spin } from "antd";
import { useBoolean, useGetData, useSetState } from "@/hooks";
import ArticleCard from "./ArticleCard";
import { HomeMainWrapper, ArticleWrapper, SwiperWrapper } from "./styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

function Main() {
  const [state, setState] = useSetState({
    pageNum: 1,
    category: "all",
    total: 10,
  });

  const navigate = useNavigate();

  const [loading, on, off] = useBoolean(true);

  const [articleData, run] = useGetData<articleItem>("/article/query", {
    progress: false,
    cache: true,
    data: {
      pageNum: state.pageNum,
      pageSize: 12,
      filters: { publish: 1 },
      orderBys: "topping desc,id desc",
    },
    onSuccess(res) {
      setState({
        total: res.total,
        pageNum: state.pageNum + 1,
      });
      off();
    },
  });

  const [hotArticleData] = useGetData<articleItem>("/article/query", {
    progress: false,
    data: {
      pageNum: 1,
      pageSize: 5,
      filters: { publish: 1 },
      orderBys: "visits desc",
    },
  });

  const queryArticle = () => {
    on();
    run();
  };

  return (
    <HomeMainWrapper>
      <SwiperWrapper
        pagination={{ clickable: true, type: "bullets" }}
        navigation
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
      >
        {hotArticleData.map((item) => {
          return (
            <SwiperSlide
              className="SwiperSlide"
              onClick={() => navigate(`/article/${item.id}`)}
            >
              <div className="title">{item.title}</div>
              <img
                src={`${globalConfig.remoteStaticUrl}/image/${item.picture}`}
              />
            </SwiperSlide>
          );
        })}
      </SwiperWrapper>
      <ArticleWrapper>
        {articleData.map((item) => (
          <div className="item" key={item.id}>
            <ArticleCard {...item} />
          </div>
        ))}
        <Divider plain className="article-footer">
          {loading ? (
            <Spin />
          ) : articleData.length < state.total ? (
            <div className="loadMore" onClick={queryArticle}>
              点击加载更多
            </div>
          ) : (
            <Divider plain className="article-footer">
              没有更多文章了 ---- 🤐
            </Divider>
          )}
        </Divider>
      </ArticleWrapper>
    </HomeMainWrapper>
  );
}

export default Main;
