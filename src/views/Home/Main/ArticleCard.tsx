import Icon from "@/components/Basic/Icon";
import { Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { IconText } from "@/components";
import {
  ArticleCardWrapper,
  ArticleCardFooter,
  ArticleCardImage,
  ArticleCardMain,
} from "./styled";
import { time } from "hyl-utils";

function ArticleCard(props: ArticleCardProps) {
  const {
    title,
    id,
    comments,
    visits,
    category,
    createTime,
    picture,
    topping,
  } = props;

  const history = useNavigate();

  return (
    <ArticleCardWrapper onClick={() => history(`/article/${id}`)} key={id}>
      {topping === 1 && <div className="topping">置顶</div>}

      <ArticleCardImage>
        <img
          className="image"
          src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
        />
      </ArticleCardImage>

      <ArticleCardMain>
        <div className="title">{title}</div>
        <div className="more">
          <IconText icon="icon-shijian" size={16}>
            {" "}
            {time.parseFrom(createTime)}
          </IconText>
          <Space>
            <IconText icon="icon-changyonghuifu" size={16}>
              {comments}
            </IconText>
            <IconText icon="icon-chakan" size={16}>
              {visits}
            </IconText>
          </Space>
        </div>
      </ArticleCardMain>

      <ArticleCardFooter>
        {category.split(",").map((item: string) => (
          <Tag icon={<Icon type="icon-biaoqian2" />} color="pink" key={item}>
            {item}
          </Tag>
        ))}
      </ArticleCardFooter>
    </ArticleCardWrapper>
  );
}

export default ArticleCard;