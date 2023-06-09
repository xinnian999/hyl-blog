import { useMount } from "@/hooks";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { request } from "@/utils";
import textCustom from "./textCustom";
import { BannerTextWrapper } from "./styled";
import { Icon } from "@/components";
import { Fc3DBtn } from "fancy-components";
import { GithubOutlined } from "@ant-design/icons";

new Fc3DBtn();

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
          <fc-3d-btn className="btn" onClick={goNext}>
            <Icon className="ico" type="icon-jiantou_yemian_xiangxia" />{" "}
            开始阅读
          </fc-3d-btn>
          <fc-3d-btn
            className="btn"
            onClick={() => window.open("https://github.com/xinnian999")}
          >
            <GithubOutlined />
            &nbsp;github
          </fc-3d-btn>
        </div>
      </div>
    </BannerTextWrapper>
  );
}

export default BannerText;
