interface PlateProps {
  title: string;
  autograph?: import("react").ReactNode;
  children?: any;
  bg?: string;
  id?: string;
}

type BannerProps = Omit<PlateProps, "children", "id">;
