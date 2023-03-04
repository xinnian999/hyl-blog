/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference path="path/types.d.ts" />

declare type responseType = {
  data: any[];
  status: number;
  total: number;
};

declare module "aplayer";
declare const $;

declare const globalConfig: {
  remoteStaticUrl: string;
  iconfont: string;
  title: string;
  description: string;
};

declare interface articleItem {
  title: string;
  category: string;
  introduce: string;
  content: string;
  picture: string;
  type: number;
  visits: number;
  comments: number;
  publish: number;
  topping: number;
  createTime: string;
  updateTime: string;
  id: number;
}

declare type categoryItem = {
  name: string;
  loading?: boolean;
  id: number;
};
