declare const globalConfig: {
  remoteStaticUrl: string;
  iconfont: string;
  title: string;
  description: string;
};

declare const $;

type responseType = {
  data: any[];
  status: number;
  total: number;
};

module "aplayer";

module "rc-scroll-anim";
