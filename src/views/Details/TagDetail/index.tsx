import { Icon, Plate } from '@/components';
import { useMount } from '@/hooks';
import { Tabs } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Article from './Article';

const TagDetail = () => {
  const { tagName = '', type = 'article' } = useParams();

  const [tab, setTab] = useState('article');

  const navigate = useNavigate();

  useMount(() => {
    setTab(type);
  });

  const onChangeTab = key => {
    setTab(key);
    navigate(`/tag/${tagName}/${key}`);
  };

  return (
    <Plate
      title={
        <div>
          <Icon type='icon-biaoqian2' /> {tagName}
        </div>
      }
      bg='bg15.jpg'
    >
      <Tabs activeKey={tab} onChange={onChangeTab}>
        <Tabs.TabPane tab='文章' key='article'>
          <Article tag={tagName} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='作品' key='work'></Tabs.TabPane>
        <Tabs.TabPane tab='笔记' key='note'></Tabs.TabPane>
      </Tabs>
    </Plate>
  );
};

export default TagDetail;
