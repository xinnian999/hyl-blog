import { useState, useEffect } from "react";
import { OverPack } from "rc-scroll-anim";
import { Button } from "antd";
import { request } from "@/utils";
import {
  SentenceContentWapper,
  Name,
  Lines,
  ChangeBar,
} from "./StyleComponents";

function SentenceContent() {
  const [visible, setVisible] = useState(true);
  const [{ name, content }, setSentence] = useState({ name: "", content: "" });

  const querySentence = () => {
    setVisible(false);
    request
      .get("/lines/queryRandOne", { params: { no: name } })
      .then(({ data, status }: any) => {
        if (status === 0) {
          setSentence(data[0]);
          setVisible(true);
        }
      });
  };

  useEffect(() => {
    querySentence();
  }, []);

  return (
    <SentenceContentWapper className="SentenceContent">
      <OverPack playScale={0.2}>
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
            ghost
            className="animate__animated animate__fadeInLeft"
            onClick={querySentence}
          >
            换一句
          </Button>
        </ChangeBar>
      </OverPack>
    </SentenceContentWapper>
  );
}

export default SentenceContent;
