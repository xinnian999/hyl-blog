import Icon from "@/components/Basic/Icon";
import { Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { IconText, LazyBox } from "@/components";
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
    introduce,
    picture,
    topping,
    type,
    content,
  } = props;

  const history = useNavigate();

  return (
    <LazyBox height="500px" animation="zoomIn">
      <ArticleCardWrapper onClick={() => history(`/article/${id}`)} key={id}>
        {topping === 1 && <div className="topping">置顶</div>}

        <ArticleCardImage>
          <img
            className="image"
            src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
          />
          <p className="title"> {title}</p>
        </ArticleCardImage>

        <ArticleCardMain>
          <div className="introduce">{content}</div>
          <div className="more">
            <IconText icon="icon-shijian" size={16}>
              {" "}
              {time.parse(createTime, "YYYY-MM-DD")}
            </IconText>
            <Space>
              <IconText icon="icon-chakan" size={16}>
                {comments}
              </IconText>
              <IconText icon="icon-changyonghuifu" size={16}>
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
    </LazyBox>
  );
}

export default ArticleCard;
