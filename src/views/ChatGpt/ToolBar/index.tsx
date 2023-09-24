import { Icon } from '@/components';
import { RedoOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import useStore from '../store';
import { ToolBarWrapper } from '../styled';

const ToolBar = () => {
  const { autoScroll, fullScreen } = useStore();

  const menu = [
    {
      icon: <Icon type='icon-fangda' />,
      message: '全屏',
      type: fullScreen ? 'primary' : 'default',
      onClick: () => useStore.setState({ fullScreen: !fullScreen }),
    },
    {
      icon: <Icon type='icon-Scroll-Up' />,
      message: '消息自动向上滚动',
      type: autoScroll ? 'primary' : 'default',
      onClick: () => useStore.setState({ autoScroll: !autoScroll }),
    },
    {
      icon: <RedoOutlined />,
      message: '清空所有对话',
      type: 'primary',
      onClick: () => {
        localStorage.removeItem('chatgpt');

        window.location.reload();
      },
    },
  ];

  return (
    <ToolBarWrapper direction='vertical'>
      {menu.map(({ message, icon, type, onClick }) => (
        <Tooltip
          title={message}
          placement='left'
          getPopupContainer={target => target}
          key={message}
        >
          <Button icon={icon} type={type as any} onClick={onClick} />
        </Tooltip>
      ))}
    </ToolBarWrapper>
  );
};

export default ToolBar;
