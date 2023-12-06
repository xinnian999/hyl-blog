import { ReactNode } from 'react';
import { PlateBanner, PlateContent } from './styled';

interface PlateProps {
  title?: ReactNode;
  description?: ReactNode;
  bg?: string;
  children?: React.ReactNode;
  hasBackgroundColor?: boolean;
}

const Plate: React.FC<PlateProps> = ({
  title,
  children,
  hasBackgroundColor = true,
  bg,
  description,
}) => (
  <>
    <PlateBanner bg={bg}>
      <div className='bg' />
      <div className='info'>
        <div className='title'>{title}</div>
        <div className='description'>{description}</div>
      </div>
    </PlateBanner>
    <PlateContent hasBackgroundColor={hasBackgroundColor}>
      {children}
    </PlateContent>
  </>
);

export default Plate;
