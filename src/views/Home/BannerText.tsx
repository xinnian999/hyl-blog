import { useMount } from "@/hooks";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { request } from "@/utils";
import textCustom from "./textCustom";
import { BannerTextWrapper } from "./styled";
import { Icon } from "@/components";

function BannerText() {
  const [exp, setExp] = useState("");
  useMount(() => {
    request.get("/experience/queryRandOne").then(({ data, status }) => {
      if (status === 0) {
        setExp(data[0].content);
      }
    });
  });

  useEffect(() => {
    if (exp) {
      textCustom();
    }
  }, [exp]);

  const goNext = () => {
    const goElement = document.querySelector(".notice");
    goElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <BannerTextWrapper>
      <h2>constantly thinking of</h2>
      <div className="autograph" style={{ opacity: 0 }}>
        <span className="autograph-text">{exp}</span>
        <span className="autograph-cursor">__</span>
      </div>
      <div className="play">
        <div className="main">
          <Button
            icon={<Icon className="ico" type="icon-jiantou_yemian_xiangxia" />}
            type="primary"
            className="btn"
            onClick={goNext}
          >
            开始阅读
          </Button>
          <Button
            type="primary"
            icon={<Icon className="ico" type="icon-github" />}
            className="btn"
            onClick={() => window.open("https://github.com/xinnian999")}
          >
            github
          </Button>
        </div>
      </div>
    </BannerTextWrapper>
  );
}

export default BannerText;
