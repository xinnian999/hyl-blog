import { Plate } from "@/components";
import { DemoMain } from "./styled";
import TableDemo from "./table";

export default function Demo() {
  return (
    <Plate title={"demo"}>
      <DemoMain>
        <TableDemo></TableDemo>
      </DemoMain>
    </Plate>
  );
}
