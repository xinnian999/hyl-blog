import { Row, Col, Tag, Avatar, Skeleton } from "antd";
import { Tabs } from "@arco-design/web-react";
import { Prism } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { PageCenter, Banner, Title, Copy } from "@/components";
import { useRequest } from "@/hooks";
import "./style.scss";
import { useMemo } from "react";

const tags = [
  { color: "green", icon: <CheckOutlined />, con: "原创优先" },
  { color: "green", icon: <CheckOutlined />, con: "技术优先" },
  { color: "red", icon: <CloseOutlined />, con: "经常宕机" },
  { color: "red", icon: <CloseOutlined />, con: "不合法规" },
  { color: "red", icon: <CloseOutlined />, con: "插边球站" },
  { color: "red", icon: <CloseOutlined />, con: "红标报毒" },
];

const info = `名称：心念の空间站
网址：https://www.hyl999.co
图标：https://www.hyl999.co/favicon.ico
描述：犹一心一意 , 念念不忘`;

const yaml = `- name: 心念の空间站
  link: https://www.hyl999.co
  avatar: https://www.hyl999.co/favicon.ico
  descr: 犹一心一意 , 念念不忘`;

export default function Link() {
  const [data] = useRequest("/link/query", {
    mockLoadingCount: 8,
    params: {
      orderBys: "id desc",
    },
    onFail(res) {
      console.log(res);
    },
  });

  const renderInfo = useMemo(
    () => (
      <Tabs type="card-gutter">
        <Tabs.TabPane title="中文" key="chinese">
          <Copy content={info}>
            <pre className="mylink-info">{info}</pre>
          </Copy>
        </Tabs.TabPane>
        <Tabs.TabPane title="Yaml" key="yaml">
          <Copy content={yaml}>
            <Prism
              showLineNumbers
              style={tomorrow}
              language={"xml"}
              PreTag="div"
              children={yaml}
            />
          </Copy>
        </Tabs.TabPane>
      </Tabs>
    ),
    []
  );

  return (
    <>
      <Banner
        title="友 情 链 接"
        autograph="我们都像小孩，胡闹是因为依赖；礼貌，是因为是陌生。"
      />
      <PageCenter>
        <div className="explain">
          <Title>链接申请说明</Title>
          <div className="explain-main">
            <p className="tags">
              {tags.map((item) => (
                <Tag color={item.color} icon={item.icon} key={item.con}>
                  {item.con}
                </Tag>
              ))}
            </p>
            <div className="content">
              <p>
                交换友链可在 <b>留言板</b>
                ，本站友链倒序排列，且不定期清理失效友链
              </p>
              {renderInfo}
            </div>
          </div>
        </div>

        <Row gutter={26} wrap className="link-main">
          {data.map(({ avator, name, descr, link, id, loading }) => {
            return (
              <Col span={6} onClick={() => window.open(link)} key={id}>
                <div className="linkItem">
                  <Skeleton loading={loading} active>
                    <Avatar src={avator} className="avatar" />
                    <span>{name}</span>
                    <div>{descr}</div>
                  </Skeleton>
                </div>
              </Col>
            );
          })}
        </Row>
      </PageCenter>
    </>
  );
}
