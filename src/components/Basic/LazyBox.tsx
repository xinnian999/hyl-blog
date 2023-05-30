import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { useBoolean } from "@/hooks";

interface LazyDomProps {
  animation?: string;
}

interface LazyBoxProps extends LazyDomProps {
  children: ReactNode;
  height?: string;
}

const LazyDom = styled.div<LazyDomProps>`
  animation: ${(props) => props.animation};
  animation-duration: 1s;
`;

const LazyBox: React.FC<LazyBoxProps> = ({
  children,
  height = "100px",
  animation = "none",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, on] = useBoolean(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // 阈值设置为 0.1，表示当元素 10% 进入视窗时触发回调函数
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        on();
        observer.unobserve(entry.target); // 只需要观察一次，观察完后解除观察
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {visible ? (
        <LazyDom animation={animation}>{children}</LazyDom>
      ) : (
        <div style={{ height }} />
      )}
    </div>
  );
};

export default LazyBox;
