declare const globalConfig: {
  remoteStaticUrl: string;
  iconfont: string;
  title: string;
  description: string;
  rootValue: number;
};

declare const $;

type responseType = {
  data: any[];
  status: number;
  total: number;
};

interface Item {
  id: number;
  createTime: string;
  updateTime: string;
}

interface DomProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
