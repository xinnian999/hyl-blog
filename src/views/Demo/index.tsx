import { Plate } from "@/components";
import { Button } from "antd";

export default function Demo() {
  const goNext = () => {
    const goElement = document.querySelector("#Footer");
    goElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <Plate title="demo">
      <Button onClick={goNext}>test</Button>
    </Plate>
  );
}
