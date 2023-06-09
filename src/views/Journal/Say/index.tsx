import { Timeline } from "antd";
import { classnames, time } from "hyl-utils";
import { OverPack } from "rc-scroll-anim";
import { Icon, Image, Plate } from "@/components";
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
    <Plate
      title="说说"
      autograph="不必慌张，活好当下，来日方长；不必失望，人间值得，未来可期。"
      bg="bg13.jpg"
    >
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
              <OverPack playScale={0} targetId="container" always={false}>
                <Bubble
                  type={width > 800 ? (index % 2 === 0 ? 0 : 1) : 0}
                  className={classnames(
                    "animate__animated",
                    "animate__jackInTheBox"
                  )}
                >
                  <div className="content">{content}</div>
                  <br />
                  {picture && (
                    <Image
                      src={`${globalConfig.remoteStaticUrl}/image/${picture}`}
                    />
                  )}
                  {width < 800 && (
                    <div className="Journal-time-iphone">
                      {time.parse(createTime, "YYYY年MM月DD日")}
                    </div>
                  )}
                </Bubble>
              </OverPack>
            </Timeline.Item>
          ))}
        </Timeline>
      </JournalWrapper>
    </Plate>
  );
};

export default Say;
