import { Timeline, Image } from "antd";
import classnames from "classnames";
import { Bubble, Icon, OverPack } from "@/components";
import { useWindowSize, useRequest } from "@/hooks";
import { globalConfig, Time } from "@/utils";
import "./style.scss";

const First = () => {
  const [data] = useRequest("/mood/query");

  const { width } = useWindowSize();

  return (
    <div className="Journal">
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
                  {Time.getYMDTime(createTime)}
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
                className="animate__animated animate__fadeInUp"
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
                    {Time.getYMDTime(createTime)}
                  </div>
                )}
              </Bubble>
            </OverPack>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default First;