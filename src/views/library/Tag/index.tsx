import { Plate } from '@/components';
import { useGetData } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagItem = styled.div`
  padding: 10px 15px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #ededed;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    background-color: var(--ant-primary-color);
    color: #fff;
    transform: scale(1.2);
  }
  .count {
    color: #363636;
    opacity: 0.4;
    font-size: 13px;
    padding-left: 5px;
    position: relative;
    top: -5px;
  }
`;

const Tag = () => {
  const [tagData] = useGetData('/category/query');

  const navigate = useNavigate();

  return (
    <Plate title='标签'>
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
