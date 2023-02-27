import { useRedux } from "@/hooks";
import { useEffect } from "react";
import starBg from "./starBg";
import "./style.scss";

function Lantern() {
  const { store } = useRedux();

  useEffect(() => {
    const body = document.querySelector("body")!;
    if (store.dark) {
      body.id = "dark";
      starBg(store.theme.bg);
    } else {
      body.id = "light";

      const bg: any = document.querySelector("#canvasBg")!;
      bg.style.display = "none";
    }
  }, [store.dark]);

  return (
    <div id="backgroundImg">
      <canvas id="canvasBg"></canvas>
    </div>
  );
}

export default Lantern;
