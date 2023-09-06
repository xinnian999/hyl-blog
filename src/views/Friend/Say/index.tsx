import { Timeline } from "antd";
import { classnames, time } from "hyl-utils";
import { Icon, LazyImage, Plate, LazyBox } from "@/components";
import { useWindowSize, useGetData } from "@/hooks";
import { JournalWrapper, Bubble } from "./styled";

type Data = {
  content: string;
  picture: string;
  category: string;
  createTime: string;
};

const Say = () => {
  const [data] = useGetData<Data>("/mood/query");

  const { width } = useWindowSize();

  return (
    <Plate title="说说" bg="bg13.jpg">
      <JournalWrapper>
        <Timeline
          mode={width > 800 ? "alternate" : "left"}
          pending={<div>查询中···</div>}
          className="timeline"
        >
          {data.map(({ content, picture, category, createTime }, index) => (
            <Timeline.Item
              label={
                width > 800 && (
                  <div className="Journal-time">
                    {time.parse(createTime, "YYYY年MM月DD日")}
                  </div>
                )
              }
              dot={
                <div
                  className={classnames("dot", {
                    weizhi: category === "weizhi",
                    tupian: category === "tupian",
                    shipin: category === "shipin",
                  })}
                >
                  <Icon type={`icon-${category}`} className="dot-icon" />
                </div>
              }
              key={content}
            >
              <LazyBox animation="jackInTheBox">
                <Bubble type={width > 800 ? (index % 2 === 0 ? 0 : 1) : 0}>
                  <div className="content">{content}</div>
                  <br />
                  {picture && (
                    <LazyImage
                      src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
                    />
                  )}
                  {width < 800 && (
                    <div className="Journal-time-iphone">
                      {time.parse(createTime, "YYYY年MM月DD日")}
                    </div>
                  )}
                </Bubble>
              </LazyBox>
            </Timeline.Item>
          ))}
        </Timeline>
      </JournalWrapper>
    </Plate>
  );
};

export default Say;
