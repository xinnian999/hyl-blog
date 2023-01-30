import { Button } from "antd";
import { Url, Cookie } from "hyl-utils";

export default function Demo() {
  const go = () => {
    Cookie.remove("blog_token");
  };
  return <Button onClick={go}>demo</Button>;
}
