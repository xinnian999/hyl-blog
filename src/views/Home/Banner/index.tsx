import { useMount, useBoolean } from "@/hooks";
import { Particle } from "jparticles";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Drawer } from "@arco-design/web-react";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./style.scss";
import TweenOne from "rc-tween-one";
import { useRef } from "react";
import classNames from "classnames";

export default function Banner() {
  const navigate = useNavigate();

  const [visible, setTrue, setFalse, toggle] = useBoolean(false);

  const drawerRef = useRef(null);

  useMount(() => {
    new Particle("#homeParticle", {
      // 两粒子圆心点之间的直线距离
      proximity: 100,
      // 定位点半径 100 以内（包含）的所有粒子，圆心点之间小于等于 proximity 值，则连线
      range: 150,
      color: "#6db6db",
      eventElem: document.querySelector(".homeBanner") as any,
      num: 0.13,
      lineWidth: 0.4,
      minR: 2,
    });
  });

  const goNext = () => {
    const goElement = document.querySelector(".homeArticle");
    goElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="homeBanner" ref={drawerRef}>
      <div id="homeParticle"></div>
      <div className="bannerContent">
        <p className="bannerContent-title  animate__animated animate__fadeInDown">
          心 念
        </p>
        <p className="bannerContent-autograph  animate__animated animate__fadeInUp">
          犹一心一意，念念不忘
        </p>
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
