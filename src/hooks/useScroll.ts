import { throttle } from "hyl-utils";
import { useState, useEffect } from "react";

const useScroll = (el: HTMLElement | null | Window = window) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const onScroll = throttle(() => {
    if (el === window) {
      setTop(el.scrollY);
      setLeft(el.scrollX);
    } else {
      setTop((el as HTMLElement).scrollTop);
      setLeft((el as HTMLElement).scrollLeft);
    }
  }, 100);

  useEffect(() => {
    if (el) {
      el.addEventListener("scroll", onScroll);

      return () => el.removeEventListener("scroll", onScroll);
    }
  }, [el]);

  return { top, left };
};

export default useScroll;
