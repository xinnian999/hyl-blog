// @ts-nocheck
/* eslint-disable */
import { useMount, useBoolean } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Canvas from "@/views/Home/Banner/Canvas";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./style.scss";
import TweenOne from "rc-tween-one";
import { useRef } from "react";
import classNames from "classnames";

export default function Banner() {
  const navigate = useNavigate();

  const [visible, , , toggle] = useBoolean(false);

  const drawerRef = useRef(null);

  useMount(() => {
    var isOn = 0,
      sets,
      fx,
      toAnimate = "#effect",
      settings = {
        animation: 8, //动画方式 从1-15 每个数字代表一个动画 请自测效果
        animationType: "in", //显示方式 in 和out 参数，in代表入场,out代表出场
        backwards: false, //改变动画显示方向，默认false 设为true 动画将从后往前倒序播放
        easing: "easeOutQuint", //这里的效果 可以参见http://code.ciaoca.com/jquery/easing/
        speed: 1000, //动画帧速 即在指定时间内完成动画
        sequenceDelay: 100, //场景延迟  即执行完上一个动画后，等待指定时间继续执行下一动画
        startDelay: 0, //开始延迟，即执行当前动画时，等待指定时间后再开始
        offsetX: 100, //动画元素 x坐标偏移量
        offsetY: 50, //动画元素 Y坐标偏移量
        onComplete: doThis, //回调函数 即 执行完动画后，需要执行的回调方法
        restoreHTML: true, //重置元素 即重复播放两次该动画 类似于此效果 默认true
      };

    jQuery(document).ready(function () {
      fx = jQuery("#effect");
      jQuery.cjTextFx(settings);
      jQuery.cjTextFx.animate(toAnimate);
    });

    function doThis() {
      console.log("landing");
      fx = jQuery("#effect1");
      var animateObj = "#effect1";
      if (isOn === 13) {
        fx.html("犹一心一意，念念不忘");
        sets = {
          animation: 1,
          animationType: "in",
          restoreHTML: false,
          onComplete: false,
        };
      } else {
        isOn < 13 ? isOn++ : (isOn = 0);
        switch (isOn) {
          case 1:
            sets = {
              animation: 2,
              animationType: "in",
              easing: "easeInQuint",
              restoreHTML: false,
              startDelay: 0,
            };
            break;

          case 2:
            sets = { animation: 11, animationType: "out", restoreHTML: false };
            break;

          case 3:
            fx.html("犹一心一意，念念不忘");
            sets = { animation: 11, animationType: "in", restoreHTML: false };
            break;
          case 4:
            sets = { animation: 5, animationType: "out", restoreHTML: false };
            break;
          case 5:
            fx.html("犹一心一意，念念不忘");
            sets = { animation: 1 };
            break;

          case 6:
            sets = { animation: 1, animationType: "out", restoreHTML: false };
            break;

          case 7:
            fx.html("犹一心一意，念念不忘");
            sets = { animation: 6, backwards: true };
            break;

          case 8:
            sets = {
              animation: 4,
              animationType: "out",
              backwards: true,
              restoreHTML: false,
            };
            break;

          case 9:
            fx.html("犹一心一意，念念不忘");
            sets = { animation: 2, easing: "easeOutBounce" };
            break;

          case 10:
            sets = {
              animation: 2,
              animationType: "out",
              speed: 500,
              easing: "easeInBack",
              restoreHTML: false,
            };
            break;

          case 11:
            fx.html("犹一心一意，念念不忘");
            sets = {
              animation: 14,
              startDelay: 1000,
              easing: "easeInBack",
              restoreHTML: false,
            };
            break;

          case 12:
            sets = {
              animation: 6,
              animationType: "out",
              speed: 500,
              easing: "easeInBack",
              restoreHTML: false,
            };
            break;

          default: //在这设定返回从头开始
            isOn = 0;
            break;
        }
      }
      jQuery.cjTextFx.animate(animateObj, sets);
    }
  });

  const goNext = () => {
    const goElement = document.querySelector(".homeArticle");
    goElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="homeBanner" ref={drawerRef}>
      <Canvas />
      <div className="bannerContent">
        <p className="bannerContent-title" id="effect">
          心念 の 空间站
        </p>
        <p className="bannerContent-autograph" id="effect1">
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
