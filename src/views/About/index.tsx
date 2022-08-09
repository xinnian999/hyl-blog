import { Timeline, Tag as AntdTag } from "antd";
import { QqOutlined, WechatOutlined, MailOutlined } from "@ant-design/icons";
import {
  PageCenter,
  withProgress,
  Title,
  Tag,
  Info,
  Section,
} from "@/components";
import { Time } from "@/utils";
import { useMount, useSetState, useRequest } from "@/hooks";
import "./style.scss";

const About = () => {
  const [{ onTime }, setState] = useSetState({
    onTime: " 0 年 0 个月 0 天 0 小时 0 分种 0 秒",
  });

  const [updateLog] = useRequest("/updateLog/query");

  const startTime = Date.parse("2022/6/1 10:00");

  useMount(() => {
    const t = setInterval(() => {
      setState({ onTime: new Time(startTime).getDuration() });
      console.log(111);
    }, 1000);

    return () => clearInterval(t);
  });

  return (
    <>
      <PageCenter className="animate__animated animate__zoomIn">
        <div id="about">
          <Title>关于我</Title>
          <Info>
            99年来到这个世界，坐标北京，河北唐山人
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
          </Info>
          <Title>关于本站</Title>
          <Info>
            <Section>
              想成为一个优秀的前端不能只会前端，对后端及其他架构都应该有一定了解。
            </Section>
            <Section>
              写这个博客的目的就是为了让自己多学习一些前端以外的知识，顺便也为了消磨一下自己平时闲暇的时间（疫情隔离在家憋疯的我）。但短时间内也不容易掌握后端等语言，好在有node这个利器，可以用我擅长的js码出一套后端系统。也慢慢学会了用服务器，域名，nginx等上线网站。
            </Section>
            <Section>
              <b>
                本站的编写纯属个人爱好，前后端均独立完成；主要用来记录自己工作、生活、学习上的笔记。
              </b>
            </Section>
            <br />
            本站结构:
            <br />
            前端 ： <Tag>react</Tag>
            <br />
            后台管理 ： <Tag>vue3</Tag>
            <br />
            后端 ：<Tag>koa2 + mysql</Tag> <br />
            部署 ：<Tag>宝塔 + nginx + pm2</Tag>
            <br />
            服务器 ：<Tag>腾讯云CentOS</Tag>
            <br />
            <br />
            <Section>
              <b>网站已勉强运行：</b>
              <Tag>{onTime}</Tag>
            </Section>
          </Info>
          <Title>更新日志</Title>
          <Info className="updateLog">
            <Timeline>
              {updateLog.map(({ content, creatTime }) => (
                <Timeline.Item key={creatTime}>
                  <AntdTag className="time">
                    {new Time(creatTime).getYMDTime()}
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
        </div>
      </PageCenter>
    </>
  );
};

export default withProgress(About);
