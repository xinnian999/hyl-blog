import Icon from "@/components/Basic/Icon";
import { Tag, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { TimeBar, LazyBox } from "@/components";
import { ArticleCardWrapper } from "./styled";

function ArticleCard(props: ArticleCardProps) {
  const {
    title,
    id,
    comments,
    visits,
    category,
    createTime,
    introduce,
    picture,
    topping,
    type,
  } = props;

  const history = useNavigate();

  return (
    <LazyBox height="300px" animation="zoomIn">
      <ArticleCardWrapper onClick={() => history(`/article/${id}`)} key={id}>
        {topping === 1 && <div className="topping">置顶</div>}
        <div className="time">
          <TimeBar time={createTime} />
        </div>
        <div className="title">
          <span>【{type === 1 ? "原创" : "转载"}】</span> {title}
        </div>
        <div className="content">
          <div className="img-box" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
              alt="图片加载失败了😭"
              height="100%"
              width="100%"
            />
          </div>
          <div className="content-box">{introduce || "暂无简介..."}</div>
        </div>
        <div className="toolbar">
          {category.split(",").map((item: string) => (
            <Tag icon={<Icon type="icon-biaoqian2" />} color="pink" key={item}>
              {item}
            </Tag>
          ))}
          <div className="record">
            <div className="reply">
              <Icon type="icon-huifu" style={{ fontSize: "20px" }} />
              <span>{comments || "0"}</span>
            </div>
            <div className="see">
              <Icon type="icon-chakan" style={{ fontSize: "20px" }} />
              <span>{visits}</span>
            </div>
          </div>
        </div>
      </ArticleCardWrapper>
    </LazyBox>
  );
}

export default ArticleCard;
