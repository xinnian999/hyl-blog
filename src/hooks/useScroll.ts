import { useState, useEffect } from "react";

// 监听页面是否滚动到指定位置
const useScroll = (num?: number) => {
  const [scrollNum, setScrollNum] = useState(0);
  const [visible, setVisible] = useState(false);
  const onScroll = (e: any) => {
    // @ts-ignore
    const scrollNum = e.srcElement.documentElement.scrollTop;
    setScrollNum(scrollNum);
    // console.log(scrollNum);
    if (num && scrollNum >= num) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return [visible, scrollNum];
};

export default useScroll;
