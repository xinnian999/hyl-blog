import { useEffect, useRef } from "react";

function Ref() {
  const ref = useRef({ name: "hyl" });

  useEffect(() => {
    ref.current.name = "zyy";
    console.log(ref);
  }, []);

  return null;
}

export default Ref;
