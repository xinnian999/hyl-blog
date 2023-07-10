import { CaretDownOutlined } from "@ant-design/icons";
import { PopoverFlag } from "./styled";

interface PopoverProps extends DomProps {
  content: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children, content }) => {
  return (
    <PopoverFlag className="PopoverFlag">
      {children}
      {/* {content && <CaretDownOutlined className="down" />} */}
      {content && <div className="content">{content}</div>}
    </PopoverFlag>
  );
};

export default Popover;
