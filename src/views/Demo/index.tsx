import { Plate } from "@/components";
import { DemoMain } from "./styled";
import TableDemo from "./table";

const a = "a";
const b = "\n\n";
const c =
  "谁言时光不可追，\n岁月流转已数风；\n红尘浮沉情更深，\n此刻留下诗一篇。\n\n十年相伴乐悠悠，\n岸浅桥深莲自由；\n屏山叠嶂恰相似，\n白鹭飞翔醉美景。\n\n于此信步咏清波，\n碧浪盈襟鱼儿舞；\n自然之景心中留，\n岁月流转自由逐。";

export default function Demo() {
  return (
    <Plate title={"demo"}>
      <DemoMain>{a + b + c}</DemoMain>
    </Plate>
  );
}
