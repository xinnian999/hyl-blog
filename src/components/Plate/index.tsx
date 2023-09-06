import { PlateContent, PlateBanner } from "./styled";

interface PlateProps {
  title?: string;
  bg?: string;
  children?: React.ReactNode;
  hasBackgroundColor?:boolean
}

const Plate: React.FC<PlateProps> = ({ title, children,hasBackgroundColor=true }) => {
  return (
    <>
      <PlateBanner>
        <div className="bg" />
        <h2>{title}</h2>
      </PlateBanner>
      <PlateContent hasBackgroundColor={hasBackgroundColor}>{children}</PlateContent>
    </>
  );
};

export default Plate;
