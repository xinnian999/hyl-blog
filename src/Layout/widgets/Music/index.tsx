import APlayer from "aplayer";
import { useGetData, useRedux } from "@/hooks";
import "aplayer/dist/APlayer.min.css";

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
        audio: data, // 音乐信息
        fixed: true, // 开启吸底模式
        listFolded: true, // 折叠歌曲列表
        autoplay: store.autoplay, // 开启自动播放
        preload: "auto", // 自动预加载歌曲
        loop: "all", // 播放循环模式、all全部循环 one单曲循环 none只播放一次
        order: "list", //  播放模式，list列表播放, random随机播放
        theme: "#FADFA3",
        lrcType: 1,
      });
    },
  });
  return <div id="aplayer"></div>;
}

export default Music;
