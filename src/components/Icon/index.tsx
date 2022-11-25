import { createFromIconfontCN } from "@ant-design/icons";

interface isProps {
  type: string;
  [key: string]: any;
}

export default function index(props: isProps) {
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/c/font_2900696_wawir3rs4jn.js",
  });
  return <IconFont {...props} />;
}
