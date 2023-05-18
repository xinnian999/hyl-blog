module "aplayer";
module "rc-scroll-anim";
module "react-highlight-words";

declare const globalConfig: {
  remoteStaticUrl: string;
  iconfont: string;
  title: string;
  description: string;
  rootValue: number;
};

declare const $;

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
  onClick?: () => void;
}

interface routeItem {
  title?: string;
  path: string;
  icon?: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  children?: routeItemChildren[];
}

interface routeItemChildren extends Omit<routeItem, "children"> {
  index?: boolean;
}
