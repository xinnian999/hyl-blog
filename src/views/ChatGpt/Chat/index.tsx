import { useBoolean, useMount } from '@/hooks';
import { url } from 'hyl-utils';
import { useEffect, useRef } from 'react';
import useStore from '../store';
import { ChatWrapper, MessagesWrapper } from '../styled';
import Bubble from './Bubble';
import MsgInput from './MsgInput';

const { setState } = useStore;

const tip = `
  您好，我是chatgpt。\n
  我是一种由OpenAI训练的大型语言模型。我的原理是基于Transformer架构，通过预训练大量文本数据来学习如何生成人类可读的文本，然后通过接受输入并生成输出来实现对话。\n
  我的用途非常广泛，可以用于自然语言处理（NLP）任务，如对话生成、问答系统、文本生成、写代码等。
`;

function Chat() {
  const messages = useStore(
    state => state.dialogList.find(item => item.current)!.messages
  );
  const { autoValue, autoScroll, createDialog, fullScreen, sendMessage } =
    useStore();

  const [visible, onVisible] = useBoolean(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    const params = url.getParams();
    if (params.q) {
      setState({ autoValue: params.q });
      createDialog();
    }

    onVisible();

    return () => setState({ autoValue: '' });
  });

  useEffect(() => {
    if (autoScroll) {
      const element = wrapperRef.current!;
      element.scrollTo({
        top: element.scrollHeight - element.clientHeight,
        behavior: 'smooth', // 平滑滚动
      });
    }
  }, [messages, visible]);

  useEffect(() => {
    if (autoValue) {
      sendMessage(autoValue);
    }
  }, [autoValue]);

  return (
    <ChatWrapper>
      <MessagesWrapper fullScreen={fullScreen} ref={wrapperRef}>
        <Bubble isUser={false} content={tip} />
        {visible &&
          messages.map((message, index) => (
            <Bubble
              key={message.content + index}
              isUser={index % 2 === 0}
              content={message.content}
            />
          ))}
      </MessagesWrapper>

      <MsgInput />
    </ChatWrapper>
  );
}

export default Chat;
