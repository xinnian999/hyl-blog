import { Plate } from "@/components";
import { useMount } from "@/hooks";
import { ChatWindowWrapper } from "./styled";
import Chat from "./Chat";
import History from "./History";

function ChatGpt() {
  useMount(() => {
    document.title = `ChatGpt · ${globalConfig.title}`;
  });

  return (
    <Plate title="ChatGPT" autograph="最新人工智能 ~ 在线体验">
      <ChatWindowWrapper>
        <History />
        <Chat />
      </ChatWindowWrapper>
    </Plate>
  );
}

export default ChatGpt;
