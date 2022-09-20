import { Row, Col, Tag, Avatar, Skeleton } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { PageCenter, Banner, Title } from "@/components";
import { useRequest } from "@/hooks";
import { batchCopyDom } from "@/utils";
import "./style.scss";

export default function Link() {
  const [data] = useRequest("/link/query");

  return (
    <>
      <Banner
        title="友 情 链 接"
        autograph="我们都像小孩，胡闹是因为依赖；礼貌，是因为是陌生。"
      />
      <PageCenter>
        <Row>
          <Col span={24}>
            <div className="explain">
              <Title>链接申请说明</Title>
              <div className="explainMain">
                <p className="tags">
                  <Tag color="green" icon={<CheckOutlined />}>
                    原创优先
                  </Tag>
                  <Tag color="green" icon={<CheckOutlined />}>
                    技术优先
                  </Tag>
                  <Tag color="red" icon={<CloseOutlined />}>
                    经常宕机
                  </Tag>
                  <Tag color="red" icon={<CloseOutlined />}>
                    不合法规
                  </Tag>
                  <Tag color="red" icon={<CloseOutlined />}>
                    插边球站
                  </Tag>
                  <Tag color="red" icon={<CloseOutlined />}>
                    红标报毒
                  </Tag>
                </p>
                <p className="content">
                  交换友链可在 <b>留言板</b> 留言： <b>请将本站加入友链</b>{" "}
                  <br />
                  名称：心念个人博客 <br /> 网址：https://www.hyl999.co <br />
                  图标：https://www.hyl999.co/favicon.ico <br />
                  描述：犹一心一意 , 念念不忘 <br />
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Row gutter={26} wrap className="link-main">
          {data.length
            ? data.map(({ avator, name, autograph, link }) => {
                return (
                  <Col span={6} onClick={() => window.open(link)} key={link}>
                    <div className="linkItem">
                      <Avatar src={avator} className="avatar" />
                      <span>{name}</span>
                      <div>{autograph}</div>
                    </div>
                  </Col>
                );
              })
            : batchCopyDom(
                () => (
                  <Col span={6}>
                    <Skeleton avatar active paragraph={{ rows: 3 }} />
                  </Col>
                ),
                4
              )}
        </Row>
      </PageCenter>
    </>
  );
}
