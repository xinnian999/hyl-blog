import { Plate } from '@/components';
import { useGetData } from '@/hooks';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagEcharts, TagItem, TagWrapper } from './styled';

const Tag = () => {
  const [tagData] = useGetData('/current/query/tag');

  const navigate = useNavigate();

  const echartsRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(echartsRef.current!);
    const data = tagData.sort((a, b) => b.count - a.count).slice(0, 10);
    // 绘制图表
    myChart.setOption({
      title: {
        text: '标签统计',
        left: 'center',
      },
      tooltip: {},
      xAxis: {
        data: data.map(item => item.name),
      },
      yAxis: {},
      series: [
        {
          name: '数量',
          type: 'bar',
          data: data.map(item => item.count),
        },
      ],
    });
  }, [tagData]);

  return (
    <Plate title='标签'>
      <TagEcharts ref={echartsRef}>
        <div className='tag-echarts'></div>
      </TagEcharts>

      <TagWrapper>
        {tagData.map(({ name, count }) => (
          <TagItem key={name} onClick={() => navigate(`/article`)}>
            <span>{name}</span>
            <span className='count'>{count}</span>
          </TagItem>
        ))}
      </TagWrapper>
    </Plate>
  );
};

export default Tag;
