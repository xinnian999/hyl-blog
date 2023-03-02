import { Tag, Avatar, Skeleton, Tabs } from "antd";
import type { TabsProps } from "antd";
import { Prism } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Plate, Title, Copy } from "@/components";
import { useGetData } from "@/hooks";
import "./style.scss";

const tags = [
  { color: "green", icon: <CheckOutlined />, con: "原创优先" },
  { color: "green", icon: <CheckOutlined />, con: "技术优先" },
  { color: "red", icon: <CloseOutlined />, con: "经常宕机" },
  { color: "red", icon: <CloseOutlined />, con: "不合法规" },
  { color: "red", icon: <CloseOutlined />, con: "插边球站" },
  { color: "red", icon: <CloseOutlined />, con: "红标报毒" },
];

const info = `名称：${globalConfig.title}
网址：https://www.hyl999.co
图标：https://www.hyl999.co/favicon.ico
描述：犹一心一意 , 念念不忘`;

const yaml = `- name: ${globalConfig.title}
  link: https://www.hyl999.co
  avatar: https://www.hyl999.co/favicon.ico
  descr: 犹一心一意 , 念念不忘`;

export default function Link() {
  const [data] = useGetData("/link/query", {
    mockLoadingCount: 8,
  });

  const items: TabsProps["items"] = [
    {
      key: "chinese",
      label: `中文`,
      children: (
        <Copy content={info}>
          <pre className="mylink-info">{info}</pre>
        </Copy>
      ),
    },
    {
      key: "yaml",
      label: `Yaml`,
      children: (
        <Copy content={yaml}>
          <Prism
            showLineNumbers
            style={tomorrow}
            language={"xml"}
            PreTag="div"
            children={yaml}
          />
        </Copy>
      ),
    },
  ];

  return (
    <>
      <Plate
        title="友情链接"
        autograph="我们都像小孩，胡闹是因为依赖；礼貌，是因为是陌生。"
        bg="bg12.png"
      >
        {" "}
        <div id="Link" className="center">
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
                <Tabs type="card" items={items} />
              </div>
            </div>
          </div>

          <div className="link-main">
            {data.map(({ avator, name, descr, link, id, loading }) => {
              return (
                <div
                  className="linkItem"
                  onClick={() => window.open(link)}
                  key={id}
                >
                  <Skeleton loading={loading} active>
                    <Avatar src={avator} className="avatar" />
                    <span>{name}</span>
                    <div>{descr}</div>
                  </Skeleton>
                </div>
              );
            })}
          </div>
        </div>
      </Plate>
    </>
  );
}
