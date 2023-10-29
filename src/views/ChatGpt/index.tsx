import { Plate } from '@/components';
import { useMount } from '@/hooks';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import History from './History';
import ToolBar from './ToolBar';
import useStore from './store';
import { ChatGptFullScreenWrapper, ChatGptWrapper } from './styled';

function ChatGpt() {
  const { fullScreen } = useStore();

  useMount(() => {
    document.title = `ChatGpt · ${globalConfig.title}`;
  });

  useEffect(() => {
    if (fullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [fullScreen]);

  if (fullScreen) {
    return ReactDOM.createPortal(
      <ChatGptFullScreenWrapper>
        <History />
        <Chat />
        <ToolBar />
      </ChatGptFullScreenWrapper>,
      document.getElementById('root')!
    );
  }

  return (
    <Plate title='chatgpt'>
      <ChatGptWrapper>
        <History />
        <Chat />
        <ToolBar />
      </ChatGptWrapper>
    </Plate>
  );
}

export default ChatGpt;
