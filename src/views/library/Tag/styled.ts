import styled from 'styled-components';

export const TagEcharts = styled.div`
  height: 500px;
  text-align: center;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
`;

export const TagItem = styled.div`
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
