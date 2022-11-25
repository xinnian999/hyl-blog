import { useMount, useBoolean } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import TweenOne from "rc-tween-one";
import { useRef } from "react";
import classNames from "classnames";
import Canvas from "@/views/Home/Banner/Canvas";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import textCustom from "./textCustom";
import "./style.scss";

export default function Banner() {
  const navigate = useNavigate();

  const [visible, , , toggle] = useBoolean(false);

  const drawerRef = useRef(null);

  useMount(() => {
    textCustom();
  });

  const goNext = () => {
    const goElement = document.querySelector(".homeArticle");
    goElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="homeBanner" ref={drawerRef}>
      <Canvas />
      <div className="bannerContent">
        <p className="bannerContent-title text1">心念 の 空间站</p>
        <p className="bannerContent-autograph text2">犹一心一意，念念不忘</p>
        <Button
          className="bannerContent-Button  animate__animated animate__fadeInUp"
          onClick={() => navigate("/article?category=all")}
        >
          Enter Blog
        </Button>

        <TweenOne
          animation={{
            y: "-=20",
            yoyo: true,
            repeat: -1,
            duration: 1000,
          }}
          className="bannerContent-icon"
          key="icon"
          onClick={goNext}
        >
          <DownOutlined />
        </TweenOne>
      </div>

      <div className="fast-nav-btn" onClick={toggle}>
        {visible ? <CloseOutlined /> : <MenuOutlined />}
      </div>

      <div
        className={classNames("fast-nav", { "fast-nav-hide": visible })}
      ></div>
      {visible && <div className="fast-nav-mask" onClick={toggle}></div>}
      {visible && (
        <ul className="fast-nav-menus animate__animated animate__fadeInRight">
          <li onClick={() => navigate("/link")}>友链</li>
          <li onClick={() => navigate("/journal/note")}>笔记</li>
          <li onClick={() => navigate("/about")}>关于</li>
        </ul>
      )}
    </div>
  );
}
