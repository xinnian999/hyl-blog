import { useMount } from "@/hooks";
import { VideoButton as VideoButtonWrapper } from "./styled";

export default function Demo({ onClick }) {
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
    <VideoButtonWrapper
      onClick={onClick}
      className="animate__animated animate__zoomIn"
    >
      <video></video>
      <div className="text">Enter Blog</div>
    </VideoButtonWrapper>
  );
}
