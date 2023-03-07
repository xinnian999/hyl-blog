interface PlateProps {
  title: string;
  autograph?: import("react").ReactNode;
  children?: any;
  bg?: string;
}

type BannerProps = Omit<PlateProps, "children">;
