import { Button } from "antd";
// import { cookie } from "hyl-utils";
import moment from "moment";
import axios from "axios";

export default function Demo() {
  const go = () => {
    console.log(axios);
  };
  return <Button onClick={go}>demo</Button>;
}
