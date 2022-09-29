import QueueAnim from "rc-queue-anim";
import { LinkOutlined } from "@ant-design/icons";
import { Time } from "@/utils";
import { OverPack } from "@/components";
import { useRequest } from "@/hooks";
import "./style.scss";

export default function Article() {
  const [hotArticleData] = useRequest("/article/query", {
    method: "get",
    progress: false,
    params: {
      pageNum: 1,
      pageSize: 3,
      filters: { publish: 1 },
      orderBys: "visits desc",
    },
  });

  return (
    <div className="homeArticle">
      <OverPack playScale={0} className="item" always={false}>
        <div className="main">
          <div className="title animate__animated  animate__fadeIn">
            热门文章
          </div>

          <div className="autograph animate__animated  animate__fadeIn">
            <span>
              知道自己是什么年纪，并把这个年纪能做好的事情尽力做好，才可能有下个年纪的随心所欲。
            </span>
          </div>

          <QueueAnim
            className="content"
            leaveReverse
            interval={200}
            duration={1000}
            type="bottom"
            animConfig={[
              { opacity: [1, 0], translateY: [0, 300] },
              { opacity: [1, 0], translateY: [0, -300] },
            ]}
          >
            {hotArticleData
              .slice(0, 3)
              .map(({ title, picture, introduce, creatTime, id }: any) => {
                return (
                  <div className="item" key={title}>
                    <div className="item-box">
                      <div className="item-img">
                        <img
                          src={`https://cdn.hyl999.co/public/image/${picture}`}
                          alt=""
                        />
                        <a href={`/article/${id}`} className="link">
                          <LinkOutlined />
                        </a>
                      </div>
                      <div className="item-content">
                        <div className="item-title">{title}</div>
                        <div className="item-time">
                          {new Time(creatTime).getYMDTime()}
                        </div>
                        <div>{introduce}</div>
                        <a href={`/article/${id}`} className="more">
                          阅读更多
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </QueueAnim>
        </div>
      </OverPack>
    </div>
  );
}
