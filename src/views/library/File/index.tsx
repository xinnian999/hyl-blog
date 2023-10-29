import { Plate } from '@/components';
import { useQuery } from '@/hooks';
import { Divider, List, Typography } from 'antd';
import { time } from 'hyl-utils';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileWrapper, Title } from './styled';

type Data = {
  createTime: string;
};

function File() {
  const navigate = useNavigate();

  const { data } = useQuery<Data>({
    url: '/current/query/article',
    params: {
      orderBys: {
        id: 'desc',
      },
    },
  });

  const diff = time.duration(data[data.length - 1]?.createTime);

  const dataSource = useMemo(() => {
    const yearKeys: any = [
      ...new Set(
        data.map((item: any) =>
          new Date(item.createTime).getFullYear().toString()
        )
      ),
    ];

    return yearKeys.map(item => {
      const obj: any = { year: item, list: [] };
      data.forEach((v: any) => {
        if (v.createTime.includes(item)) {
          obj.list.push(v);
        }
      });

      return obj;
    });
  }, [data]);

  return (
    <Plate title='归档'>
      <FileWrapper>
        <Title>
          居然用了
          {diff.year}年零{diff.month}个月 才写了{data.length}
          篇文章
        </Title>
        {dataSource.map(({ year, list }) => (
          <React.Fragment key={year}>
            <Divider orientation='left' className='year'>
              {year}
            </Divider>

            <List
              bordered
              dataSource={list}
              loading={!data.length}
              renderItem={(item: any) => (
                <div onClick={() => navigate(`/article/${item.id}`)}>
                  <List.Item className='fileList'>
                    <Typography.Text mark>
                      [{time.parse(item.createTime, 'MM-DD')}]
                    </Typography.Text>{' '}
                    {item.title}
                  </List.Item>
                </div>
              )}
            />
          </React.Fragment>
        ))}
      </FileWrapper>
    </Plate>
  );
}

export default File;
