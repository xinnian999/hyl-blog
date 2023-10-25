import { ReactNode } from 'react';
import { PlateBanner, PlateContent } from './styled';

interface PlateProps {
  title?: ReactNode;
  bg?: string;
  children?: React.ReactNode;
  hasBackgroundColor?: boolean;
}

const Plate: React.FC<PlateProps> = ({
  title,
  children,
  hasBackgroundColor = true,
  bg,
}) => {
  return (
    <>
      <PlateBanner bg={bg}>
        <div className='bg' />
        <div className='title'>{title}</div>
      </PlateBanner>
      <PlateContent hasBackgroundColor={hasBackgroundColor}>
        {children}
      </PlateContent>
    </>
  );
};

export default Plate;
