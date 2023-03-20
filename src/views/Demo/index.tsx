import { Plate } from "@/components";
import { useMount } from "@/hooks";
import { ajax } from "hyl-utils";
import "./style.scss";
import { DemoMain, VideoButton } from "./styled";

export default function Demo() {
  useMount(() =>
    ajax({
      method: "post",
      url: "https://api.openai.com/v1/completions",
      data: {
        model: "text-davinci-003",
        prompt: "你好",
        max_tokens: 4000,
      },
      headers: {
        Authorization:
          "Bearer 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",
      },
      timeout: 500000,
    })
  );
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
