import { Plate, Preview } from "@/components";
import { useMount } from "@/hooks";
import { ChatWindowWrapper } from "./styled";
import Chat from "./Chat";
import History from "./History";

function ChatGpt() {
  useMount(() => {
    document.title = `ChatGpt · ${globalConfig.title}`;
  });

  return (
    <Plate title="chatgpt">
      <Preview width="100vw" btnPosition={{ x: 3, y: 3 }}>
        <ChatWindowWrapper>
          <History />
          <Chat />
        </ChatWindowWrapper>
      </Preview>
    </Plate>
  );
}

export default ChatGpt;
