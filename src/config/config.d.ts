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

type isStore = {
  loginState: boolean;
  theme: { bg: number; color: string };
  userInfo: {
    id: number;
    username: string;
    headPicture: string;
    email: string | null;
  };
  autoplay: boolean | undefined;
  loginModal: boolean;
  setModal: boolean;
  dark: boolean;
};
