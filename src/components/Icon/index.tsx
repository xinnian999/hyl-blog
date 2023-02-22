import { createFromIconfontCN } from "@ant-design/icons";

interface isProps {
  type: string;
  className?: string;
  [key: string]: any;
}

export default function index(props: isProps) {
  const IconFont = createFromIconfontCN({
    scriptUrl: globalConfig.iconfont,
  });
  return <IconFont {...props} />;
}
