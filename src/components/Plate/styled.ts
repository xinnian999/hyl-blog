import { r } from '@/utils';
import { MenuOutlined } from '@ant-design/icons';
import TweenOne from 'rc-tween-one';
import styled from 'styled-components';

interface PlateBannerProps {
  bg?: string;
}

export const PlateBanner = styled.div<PlateBannerProps>`
  position: relative;
  height: 500px;

  .bg {
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: ${props => (props.theme.isDark ? '0.7' : '1')};
    background-image: ${props =>
      `url(${require(`@/assets/img/bg/${props.bg || 'bg24.jpg'}`)})`};
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 500;
    font-size: 50px;
    letter-spacing: 5px;
    color: #eee;
    /* text-shadow: 3px 3px 0 var(--ant-primary-8); */
    text-shadow: 0px 0px 10px black;
  }
`;

export const PlateContent = styled.div<{ hasBackgroundColor: boolean }>`
  max-width: var(--heart-width);
  margin: 0 auto;
  position: relative;
  top: -60px;
  background-color: ${props =>
    props.hasBackgroundColor ? ' var(--background-color)' : 'transparent'};
  border-radius: 15px;
  padding: 15px;
  box-shadow: ${props =>
    props.hasBackgroundColor
      ? '0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);'
      : 'none'};
  @media screen and(max-width: 800px) {
    margin: 0 20px;
  }
`;

export const ToolbarWrapper = styled.div`
  width: 25%;
  margin-left: 25px;
  position: relative;
`;

export const ToolbarItem = styled.div`
  background-color: var(--background-color);
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

export const ToolbarFlag = styled(MenuOutlined)`
  position: fixed;
  right: 0;
  top: 30%;
  background-color: var(--highlight-background-color);
  box-shadow: var(--box-shadow);
  border: 1px solid #999;
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  font-size: ${r`25px`};
  padding: 5px 10px;
  cursor: pointer;
  z-index: 999;
`;

export const DownIcon = styled(TweenOne)`
  bottom: 20px;
  font-size: 24px;
  position: absolute;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  left: 50%;
  margin-left: -27px;

  path {
    font-weight: bold;
  }

  &:hover {
    background-color: var(--ant-primary-color);
  }
`;
