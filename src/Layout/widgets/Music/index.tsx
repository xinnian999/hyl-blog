import APlayer from "aplayer";
import { useGetData, useRedux } from "@/hooks";
import "aplayer/dist/APlayer.min.css";
import "./style.scss";
import { useEffect } from "react";

function Music() {
  const { store } = useRedux();

  useGetData("/music/query", {
    progress: false,
    onSuccess: (res) => {
      const data = res.data.map((item) => ({
        ...item,
        url: `${globalConfig.remoteStaticUrl}/music/${item.url}`,
      }));

      new APlayer({
        container: document.getElementById("aplayer"),
        audio: data,
        fixed: true,
        listFolded: true,
        autoplay: store.autoplay,
        preload: "auto",
        loop: "all",
        order: "random",
        theme: "#FADFA3",
        lrcType: 1,
      });
    },
  });

  useEffect(() => {
    const music = document.getElementById("aplayer");

    if (store.dark) {
      music?.classList.add("aplayerDark");
    } else {
      music?.classList.remove("aplayerDark");
    }
  }, [store.dark]);

  return <div id="aplayer"></div>;
}

export default Music;
