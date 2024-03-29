import { useQuery } from '@/hooks';
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import { Avatar, Tag, Tooltip } from 'antd';
import { time } from 'hyl-utils';
import { useNavigate } from 'react-router-dom';
import Tags from './Tags';
import {
  CommentItem,
  HomeSideWrapper,
  LinkImage,
  LookMore,
  SideItem,
} from './styled';

const days = [
  '星期天',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

const myLinks = [
  {
    key: 'qq',
    icon: <QqOutlined />,
    tip: <LinkImage src={require('@/assets/img/about/qqQrCode.png')} />,
  },
  {
    key: 'wx',
    icon: <WechatOutlined />,
    tip: <LinkImage src={require('@/assets/img/about/weixin.jpg')} />,
  },
  {
    key: 'github',
    icon: <GithubOutlined />,
    tip: 'https://github.com/xinnian999',
    onClick: () => window.open('https://github.com/xinnian999'),
  },
  {
    key: 'weibo',
    icon: <WeiboOutlined />,
    tip: 'https://weibo.com/mind251314',
    onClick: () => window.open('https://weibo.com/mind251314'),
  },
];

const switchTime = () => {
  const hour = new Date().getHours();
  if (hour > 0 && hour < 6) return '凌晨';
  if (hour > 6 && hour < 12) return '上午';
  if (hour > 12 && hour < 18) return '下午';
  if (hour > 18 && hour < 24) return '晚上';
};

function Side() {
  const { data: weather } = useQuery({ url: '/all/getWeather' });

  const { data: counts } = useQuery({ url: '/all/counts' });

  const { data: commentData } = useQuery<CommentData>({
    url: '/current/query/comment',
    params: {
      filters: { article_id: 99999 },
      orderBys: { id: 'desc' },
    },
  });

  const navigate = useNavigate();

  return (
    <HomeSideWrapper>
      <SideItem>
        <div className='avatar'>
          <Avatar size={100} src={require('@/assets/img/avatar/favicon.ico')} />
        </div>
        <div className='self'>
          <p>{switchTime()}好，我是心念</p>
          <p>一个99后前端工程师</p>
          <p>欢迎来到我的个人博客</p>
        </div>

        <ul className='links'>
          {myLinks.map(({ icon, tip, onClick, key }) => (
            <li onClick={onClick} key={key}>
              <Tooltip overlay={tip}>
                <div>{icon}</div>
              </Tooltip>
            </li>
          ))}
        </ul>
      </SideItem>

      <SideItem>
        <ul className='statistics'>
          {counts.map(item => (
            <li key={item.name}>
              <p>{item.name}</p>
              <h3>{item.count}</h3>
            </li>
          ))}
        </ul>
      </SideItem>

      <SideItem>
        <ul className='date'>
          <li>今日</li>
          <li>{time.parse(new Date(), 'YYYY年MM月DD日')}</li>
          <li>{days[new Date().getDay()]}</li>

          {weather.length ? (
            <li>
              {weather[0].province} {weather[0].temperature}°C{' '}
              {weather[0].weather}
            </li>
          ) : null}
        </ul>
        <img
          className='gif'
          src={require('@/assets/img/601d53f2cab22185a59b3fc9707b79e9.gif')}
        />

        <p className='lastWeek'>
          {new Date().getDay() !== 6 && new Date().getDay() !== 0
            ? `再坚持${5 - new Date().getDay()}天就到周末啦！`
            : '周末啦嗨起来(｡･∀･)ﾉﾞ'}
        </p>
      </SideItem>
      <SideItem>
        <br />
        {commentData
          .filter(item => !item.reply_id)
          .slice(0, 5)
          .map(item => (
            <CommentItem key={item.id} {...item} />
          ))}
        <LookMore>
          <Tag
            color='blue'
            bordered={false}
            onClick={() => navigate('/friend/message')}
          >
            {'> '}查看更多
          </Tag>
        </LookMore>
      </SideItem>

      <Tags />
    </HomeSideWrapper>
  );
}

export default Side;
