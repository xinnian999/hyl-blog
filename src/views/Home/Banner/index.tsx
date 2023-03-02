import { useMount, useBoolean } from "@/hooks";
import { useNavigate } from "react-router-dom";
import TweenOne from "rc-tween-one";
import { useRef } from "react";
import Canvas from "@/views/Home/Banner/Canvas";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import textCustom from "./textCustom";
import "./style.scss";
import { classnames } from "hyl-utils";

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
        <p className="bannerContent-title text1 animate__animated animate__zoomIn">
          {globalConfig.title}
        </p>
        <p className="bannerContent-autograph text2  animate__animated animate__zoomIn">
          {globalConfig.description}
        </p>
        <button
          className="bannerContent-Button  animate__animated animate__zoomIn"
          onClick={() => navigate("/article")}
        >
          Enter Blog
        </button>

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
        className={classnames("fast-nav", { "fast-nav-hide": visible })}
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
