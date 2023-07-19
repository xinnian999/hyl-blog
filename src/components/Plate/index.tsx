import { PlateContent, PlateBanner } from "./styled";

interface PlateProps {
  title?: string;
  bg?: string;
  children?: React.ReactNode;
}

const Plate: React.FC<PlateProps> = ({ title, children }) => {
  return (
    <>
      <PlateBanner>
        <div className="bg" />
        <h2>{title}</h2>
      </PlateBanner>
      <PlateContent>{children}</PlateContent>
    </>
  );
};

export default Plate;
