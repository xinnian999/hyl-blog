import { Plate } from '@/components';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';

const TagDetail = () => {
  const params = useParams();
  return (
    <Plate title={params.tag}>
      <Tabs>
        <Tabs.TabPane tab='文章' key='article'></Tabs.TabPane>
        <Tabs.TabPane tab='作品' key='work'></Tabs.TabPane>
        <Tabs.TabPane tab='笔记' key='note'></Tabs.TabPane>
      </Tabs>
    </Plate>
  );
};

export default TagDetail;
