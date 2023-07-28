import { Button } from "antd";
import { Plate } from "@/components";
import store from "@/globalStore";

const Demo = () => {
  return (
    <Plate title="demo">
      <Button
        onClick={() => {
          store.count++;
          console.log(store.count);
        }}
      >
        {store.count}
      </Button>
    </Plate>
  );
};

export default Demo;
