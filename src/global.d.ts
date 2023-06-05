/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference path="path/types.d.ts" />

module "aplayer";
module "rc-scroll-anim";
module "react-highlight-words";

declare const globalConfig: {
  remoteStaticUrl: string;
  iconfont: string;
  title: string;
  description: string;
  rootValue: number;
  homePage: string;
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

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }
}

declare module "*.avif" {
  const src: string;
  export default src;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
