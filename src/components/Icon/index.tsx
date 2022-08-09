import { createFromIconfontCN } from "@ant-design/icons";

interface isProps {
  type: string;
  [key: string]: any;
}

export default function index(props: isProps) {
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_2900696_c7fba8j6pgm.js",
  });
  return <IconFont {...props} />;
}
