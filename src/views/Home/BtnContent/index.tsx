import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { BtnContentWapper } from "./StyleComponents";
import "./style.scss";
import { OverPack } from "@/components";

function BtnContent() {
  const history = useNavigate();

  // 路由监听
  useEffect(() => {
    document.title = `心 念 · 博客`;
  }, []);

  return (
    <>
      <BtnContentWapper className="BtnContent">
        <OverPack always={false} className="BtnContentScroll" playScale={0.2}>
          <Button
            type="primary"
            ghost
            className="goBtn animate__animated animate__fadeInLeft"
            onClick={() => history("/about")}
          >
            关 于
          </Button>
          <Button
            type="primary"
            ghost
            className="goBtn animate__animated animate__fadeInRight"
            onClick={() => history("/link")}
          >
            + 友 情 链 接
          </Button>
        </OverPack>
      </BtnContentWapper>
    </>
  );
}

export default BtnContent;
