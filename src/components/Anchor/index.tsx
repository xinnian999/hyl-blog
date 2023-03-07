import { useMount } from "@/hooks";
import { Anchor as AntdAnchor } from "antd";
import { throttle } from "hyl-utils";
import "./style.scss";

interface AnchorProps {
  anchorData: any[];
  targetOffset: number;
  style: React.CSSProperties;
}

function Anchor(props: AnchorProps) {
  const { anchorData, targetOffset, style } = props;

  useMount(() => {
    const scrollAnchor = throttle(() => {
      if (document.querySelector(".ant-anchor-link-title-active")) {
        $(".anchor")
          .stop()
          .animate(
            {
              scrollTop:
                $(".ant-anchor-link-title-active").position().top -
                $(".anchor").height() / 2,
            },
            500
          );
      }
    }, 500);

    window.addEventListener("scroll", scrollAnchor);

    return () => window.removeEventListener("scroll", scrollAnchor);
  });
  return (
    <AntdAnchor
      targetOffset={targetOffset}
      affix={false}
      className="anchor"
      style={style}
    >
      {anchorData.map((item: { id: string; localName: string }) => {
        const { id, localName } = item;
        return (
          <AntdAnchor.Link
            key={id}
            href={`#${id}`}
            title={id}
            className={localName === "h2" ? "oneAnchor" : "twoAnchor"}
          />
        );
      })}
    </AntdAnchor>
  );
}

export default Anchor;
