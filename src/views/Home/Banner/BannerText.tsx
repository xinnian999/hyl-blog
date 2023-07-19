import { useMount } from "@/hooks";
import { useState, useEffect } from "react";
import { request } from "@/utils";
import textCustom from "./textCustom";
import { Icon } from "@/components";
import { Fc3DBtn } from "fancy-components";
import { GithubOutlined } from "@ant-design/icons";
import styled from "styled-components";

new Fc3DBtn();

const BannerTextWrapper = styled.div`
  margin-top: 80px;
  fc-3d-btn {
    --color: var(--ant-primary-color);
    --height: 45px;
  }
  h2 {
    font-weight: 500;
    font-size: 50px;
    margin-bottom: 20px;
    letter-spacing: 5px;
    color: #eee;
    text-shadow: 3px 3px 0 var(--ant-primary-8);
  }
  .autograph {
    font-size: 22px;
    text-shadow: 0px 0px 10px black;
    &-cursor {
      animation: shanxian 2000ms infinite;
    }
    @keyframes shanxian {
      from {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  .play {
    margin-top: 100px;

    .main {
      width: 300px;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      .btn {
        padding: 0 25px;
        height: 45px;
        /* line-height: 45px; */
        border-radius: 30px;

        .ico {
          font-size: 16px;
        }
      }
    }
  }
`;

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
    const goElement = document.querySelector("#homeMain");
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
