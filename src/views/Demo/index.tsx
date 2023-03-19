import { Plate } from "@/components";
import { useMount } from "@/hooks";
import "./style.scss";
import { DemoMain, VideoButton } from "./styled";

export default function Demo() {
  useMount(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        const video: any = document.querySelector("video")!;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
        };
      });
  });
  return (
    <Plate title={"demo"}>
      <DemoMain>
        <VideoButton>
          <video src=""></video>
          <div className="text">Enter Blog</div>
        </VideoButton>
      </DemoMain>
    </Plate>
  );
}
