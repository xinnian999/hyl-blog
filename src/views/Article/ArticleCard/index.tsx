import Icon from "@/components/Icon";
import { Tag, Image, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { TagOutlined } from "@ant-design/icons";
import { TimeBar } from "@/components";
import { globalConfig } from "@/utils";
import Images from "@/assets/img/wallpaper3.jpg";
import "./style.scss";

function ArticleCard(props: any) {
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
    loading,
  } = props.data;

  const history = useNavigate();

  const image = `${globalConfig.remoteStaticUrl}/image/${picture}`;

  return (
    <Skeleton loading={loading}>
      <div
        className="ArticleCard animate__animated animate__zoomIn"
        onClick={() => history(`/article/${id}`)}
        key={id}
      >
        {topping === 1 && <div className="topping">置顶</div>}
        <div className="time">
          <TimeBar time={createTime} />
        </div>
        <div className="title">
          <span>【原创】</span> {title}
        </div>
        <div className="content">
          <div className="img-box" onClick={(e) => e.stopPropagation()}>
            <Image
              src={image || Images}
              alt="图片加载失败了...网有点卡..."
              height="100%"
              width="100%"
            />
          </div>
          <div className="content-box">{introduce || "暂无简介..."}</div>
        </div>
        <div className="toolbar">
          <TagOutlined />{" "}
          {category.map((item: string) => (
            <Tag color="pink" key={item}>
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
      </div>
    </Skeleton>
  );
}

export default ArticleCard;
