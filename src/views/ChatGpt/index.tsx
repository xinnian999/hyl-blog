import { Plate, Preview } from "@/components";
import { useMount } from "@/hooks";
import { ChatWindowWrapper } from "./styled";
import Chat from "./Chat";
import History from "./History";
import ToolBar from "./ToolBar";
import useStore from "./store";
import ReactDOM from "react-dom";
import { useEffect } from "react";

function ChatGpt() {
  const { fullScreen } = useStore();

  useMount(() => {
    document.title = `ChatGpt · ${globalConfig.title}`;
  });

  useEffect(() => {
    if (fullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [fullScreen]);

  if (fullScreen) {
    return ReactDOM.createPortal(
      <ChatWindowWrapper fullScreen={fullScreen}>
        <History />
        <Chat />
        <ToolBar />
      </ChatWindowWrapper>,
      document.getElementById("root")!
    );
  }

  return (
    <Plate title="chatgpt">
      <ChatWindowWrapper fullScreen={false}>
        <History />
        <Chat />
        <ToolBar />
      </ChatWindowWrapper>
    </Plate>
  );
}

export default ChatGpt;
