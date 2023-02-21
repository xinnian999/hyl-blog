import { throttle } from "hyl-utils";
import { useState, useEffect } from "react";

// 监听页面是否滚动到指定位置
const useScroll = () => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const onScroll: any = throttle((e: any) => {
    setTop(e.srcElement.documentElement.scrollTop);
    setLeft(e.srcElement.documentElement.scrollLeft);
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { top, left };
};

export default useScroll;
