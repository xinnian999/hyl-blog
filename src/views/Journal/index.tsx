import { Outlet } from "react-router-dom";
import { Plate } from "@/components";

export default function Journal() {
  return (
    <>
      <Plate title="日志" autograph="越努力，越幸运">
        <Outlet />
      </Plate>
    </>
  );
}
