import styled from 'styled-components';
import Icon from './Icon';

const IconTextWrapper = styled.div`
  display: inline-block;
  span {
    margin-left: 3px;
  }
`;

interface IconTextProps {
  children: React.ReactNode;
  icon: string;
  size?: number;
}

const IconText: React.FC<IconTextProps> = ({ children, icon, size = 12 }) => (
  <IconTextWrapper>
    <Icon style={{ fontSize: `${size}px` }} type={icon} />
    <span>{children}</span>
  </IconTextWrapper>
);

export default IconText;
