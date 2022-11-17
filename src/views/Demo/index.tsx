import { useEffect, useRef } from "react";
import Canvas from "@/views/Home/Banner/Canvas";

function Ref() {
  const ref = useRef({ name: "hyl" });

  useEffect(() => {
    ref.current.name = "zyy";
    console.log(ref);
  }, []);

  return <Canvas />;
}

export default Ref;
