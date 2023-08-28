import { Plate, Preview } from "@/components";
import { useMount } from "@/hooks";
import { ChatWindowWrapper } from "./styled";
import Chat from "./Chat";
import History from "./History";
import ToolBar from "./ToolBar";

function ChatGpt() {
  useMount(() => {
    document.title = `ChatGpt · ${globalConfig.title}`;
  });

  return (
    <Plate title="chatgpt">
      <ChatWindowWrapper>
        <History />
        <Chat />
        <ToolBar />
      </ChatWindowWrapper>
    </Plate>
  );
}

export default ChatGpt;
