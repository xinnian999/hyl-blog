import { useState, useEffect } from "react";
import { Button } from "antd";
import { globalConfig, request } from "@/utils";
import {
  SentenceContentWapper,
  Name,
  Lines,
  ChangeBar,
} from "./StyleComponents";
import { OverPack } from "@/components";
import { url } from "inspector";

function SentenceContent() {
  const [visible, setVisible] = useState(true);
  const [{ name, content, picture }, setSentence] = useState({
    name: "",
    content: "",
    picture: "",
  });

  const querySentence = () => {
    setVisible(false);
    request
      .get("/lines/queryRandOne", { params: { no: name } })
      .then(({ data, status }: any) => {
        if (status === 0) {
          setSentence(data[0]);
          setVisible(true);

          const img = new Image();
          img.src = `${globalConfig.remoteStaticUrl}/image/${data[0].picture}`;
          img.onload = function () {
            const imgEl = document.querySelector(".SentenceContent");

            //@ts-ignore
            imgEl.style.backgroundImage = `url(${globalConfig.remoteStaticUrl}/image/${data[0].picture})`;
          };
        }
      });
  };

  useEffect(() => {
    querySentence();
  }, []);

  return (
    <SentenceContentWapper className="SentenceContent">
      <OverPack playScale={0.2} always={false}>
        {visible && (
          <>
            <div className="animate__animated animate__fadeInLeft">
              <Name>{name}</Name>
            </div>
            <div className="animate__animated animate__fadeInRight">
              <Lines>{content}</Lines>
            </div>
          </>
        )}
        <ChangeBar>
          <Button
            type="primary"
            shape="round"
            // ghost
            className="animate__animated animate__fadeInLeft"
            onClick={querySentence}
          >
            换一换
          </Button>
        </ChangeBar>
      </OverPack>
    </SentenceContentWapper>
  );
}

export default SentenceContent;
