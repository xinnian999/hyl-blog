import { Plate } from "@/components";
import { DemoMain } from "./styled";
import Echarts from "./echarts";

export default function Demo() {
  return (
    <Plate title={"demo"}>
      <DemoMain>
        <Echarts />
      </DemoMain>
    </Plate>
  );
}
