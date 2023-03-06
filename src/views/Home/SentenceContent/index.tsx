import { useState, useEffect } from "react";
import { Button } from "antd";
import { request } from "@/utils";
import {
  SentenceContentWapper,
  Name,
  Lines,
  ChangeBar,
} from "./StyleComponents";
import { OverPack } from "rc-scroll-anim";
import { useRedux } from "@/hooks";

function SentenceContent() {
  const [visible, setVisible] = useState(true);

  const { store } = useRedux();

  const [{ name, content }, setSentence] = useState({
    name: "",
    content: "",
    picture: "",
  });

  const querySentence = () => {
    setVisible(false);
    request
      .get("/lines/queryRandOne", { params: { no: name } })
      .then(({ data, status }) => {
        if (status === 0) {
          setSentence(data[0]);
          setVisible(true);

          const img = new Image();
          img.src = `${globalConfig.remoteStaticUrl}/image/${data[0].picture}`;
          img.onload = function () {
            const imgEl = document.querySelector(
              ".SentenceContent"
            ) as HTMLElement;
            if (store.dark) {
              imgEl.style.backgroundImage = "";
            } else {
              imgEl.style.backgroundImage = `url(${globalConfig.remoteStaticUrl}/image/${data[0].picture})`;
            }
          };
        }
      });
  };

  useEffect(() => {
    querySentence();
  }, [store.dark]);

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
