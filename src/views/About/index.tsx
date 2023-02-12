import { Timeline, Tag as AntdTag, Card } from "antd";
import { time } from "hyl-utils";
import { QqOutlined, WechatOutlined, MailOutlined } from "@ant-design/icons";
import { PageCenter, Title, Tag, Info, Section, Icon } from "@/components";
import { useMount, useSetState, useRequest } from "@/hooks";
import "./style.scss";

const About = () => {
  const [onTime, setState] = useSetState({
    millisecond: 0,
    second: 0,
    minute: 0,
    hour: 0,
    day: 0,
    month: 0,
    year: 0,
  });

  const [updateLog] = useRequest("/updateLog/query");

  useMount(() => {
    const t = setInterval(
      () => setState(time.duration("2022/6/1 10:00", new Date().toUTCString())),
      1000
    );

    return () => clearInterval(t);
  });

  return (
    <>
      <PageCenter className="animate__animated animate__zoomIn">
        <div id="about">
          <Title>关于我</Title>
          <Info>
            99年来到这个世界，河北唐山人
            <br />
            国内北大清华等重点院校落榜生，著名电视剧、电影观众
            <br />
            曾在优酷、爱奇艺、芒果TV等视频平台都充过会员
            <br />
            擅长领域：网站前端开发、吹牛逼、写bug
            <br />
            <b>个人网站非盈利性质，黑客大佬请绕行。</b> <br />
            <br />
            <b>可以通过以下方式联系到我：</b>
            <br />
            <QqOutlined className="myContact" /> 33075783337 <br />
            <WechatOutlined className="myContact" /> 17803000829 <br />
            <MailOutlined className="myContact" /> 17803000829@163.com <br />
            <Icon type="icon-gitee2" className="myContact gitee" />{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://gitee.com/mind251314/dashboard/projects"
            >
              gitee
            </a>
            <img
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png"
              className="myContact juejin"
            />{" "}
            <a
              href="https://juejin.cn/user/1900422792751454"
              target="_blank"
              rel="noreferrer"
            >
              junjin
            </a>
            <br />
          </Info>

          <Title>关于本站</Title>
          <Info>
            <Section>
              博主是一个自制力比较差的人，为了养成学习的习惯而码出这套博客，顺便也为了消磨一下自己平时闲暇的时间（疫情隔离在家憋疯的我）。现在前端技术越来越五花八门，如果为了学而去学，对我来说效率是很低的。而码出一个自己的网站，是可以学到很多不同方面很多东西（不止前端），并且越来越有成就感，感觉就像亲手构造了一个自己的世界😄。
            </Section>
            <Section>
              博客主要写一些前端的技术文章，以及记录自己踩过的坑，但更多只是写给自己看的，如果有不懂之处和可以改进的地方欢迎留言
            </Section>
            <Section>
              <b>
                本站的编写纯属个人爱好，前后端均独立完成；主要用来记录自己工作、生活、学习上的笔记。
              </b>
            </Section>
            <br />
            本站结构：
            <br />
            前端 ： <Tag>react18.2</Tag>
            <br />
            后端 ：<Tag>koa2 + mysql</Tag> <br />
            部署 ：<Tag>宝塔 + nginx + pm2</Tag>
            <br />
            服务器 ：<Tag>腾讯云CentOS</Tag>
            <br />
            <br />
            <div>
              <b>网站已勉强运行：</b>
              <Tag>{`${onTime.year}年 ${onTime.month}个月 ${onTime.day}天 ${onTime.hour}小时 ${onTime.minute}分钟 ${onTime.second}秒`}</Tag>
            </div>
          </Info>

          <Title>更新日志</Title>
          <Info className="updateLog">
            <Timeline>
              {updateLog.map(({ content, createTime }) => (
                <Timeline.Item key={createTime}>
                  <AntdTag className="time">
                    {time.parse(createTime, "YYYY-MM-DD")}
                  </AntdTag>
                  <div className="content">{content}</div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Info>
          <Title>特别说明</Title>
          <Info>
            本站文章仅代表个人观点，和任何组织或个人无关。
            <br />
            本站采用「
            <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh">
              署名-非商业性使用4.0 国际 (CC BY-NC 4.0)
            </a>
            」创作共享协议。只要在使用时注明出处，那么您可以可以对本站所有原创内容进行转载、节选、二次创作，但是您不得对其用于商业目的。
            <br />
            本站前端开发代码没有考虑对IE浏览器的兼容。
            <br />
            用户邮箱仅作回复消息用，不对外使用。
            <br />
          </Info>

          <Title>其他</Title>
          <Info className="other">
            <Card title="我的微信">
              <img src={require("@/assets/img/about/weixin.jpg")} />
            </Card>
            <Card title="我的小程序">
              <img src={require("@/assets/img/about/xiaochengxu.jpg")} />
            </Card>
            <Card title="我的公众号">
              <img src={require("@/assets/img/about/gongzhonghao.jpg")} />
            </Card>
          </Info>
        </div>
      </PageCenter>
    </>
  );
};

export default About;
