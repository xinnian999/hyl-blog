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
