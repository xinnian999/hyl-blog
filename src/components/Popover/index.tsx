import { PopoverFlag } from "./styled";

interface PopoverProps extends DomProps {
  content: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children, content }) => {
  return (
    <PopoverFlag>
      {children}
      <div className="content">{content}</div>
    </PopoverFlag>
  );
};

export default Popover;
