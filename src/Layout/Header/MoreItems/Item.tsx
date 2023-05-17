import { Tooltip } from "antd";
import { IconFlag } from "./styled";

type ItemProps = {
  type: string;
  tip?: string;
  onClick?: Function;
};

const Item = ({ type, tip, onClick }: ItemProps) => (
  <div>
    <Tooltip overlay={tip}>
      <IconFlag type={type} onClick={onClick} />
    </Tooltip>
  </div>
);

export default Item;
