import { Icon } from "@/components";
import { Button } from "antd";
import "./style.scss";

export default function Demo() {
  const go = () => {};
  return (
    <div onClick={go}>
      <Icon className="testIcon" type="icon-shuoshuo"></Icon>
    </div>
  );
}
