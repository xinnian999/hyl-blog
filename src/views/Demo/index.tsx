import { Button } from "antd";
import { Url, getRandom } from "hyl-utils";

export default function Demo() {
  const go = () => {
    Url.setParams({ name: "hsssyl" + getRandom(1, 500), like: "zaj" }, false);
    const urlParams = Url.getParams();
    console.log(urlParams);
  };
  return <Button onClick={go}>demo</Button>;
}
