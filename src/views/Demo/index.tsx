import { useEffect, useRef } from "react";
import { Loading } from "@/components";

function Ref() {
  const ref = useRef({ name: "hyl" });

  useEffect(() => {
    ref.current.name = "zyy";
    console.log(ref);
  }, []);

  return <Loading />;
}

export default Ref;
