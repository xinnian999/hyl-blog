import { Button } from "antd";
import { Plate } from "@/components";
import useStore from "@/globalStore";

const Demo = () => {
  const store = useStore();

  return (
    <Plate title="demo">
      <Button onClick={store.addCount}>{store.count}</Button>
    </Plate>
  );
};

export default Demo;
