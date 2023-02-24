import { Outlet } from "react-router-dom";
import { PageCenter, Plate } from "@/components";

export default function Journal() {
  return (
    <>
      <Plate title="日 志" autograph="每天进步一点点">
        <Outlet />
      </Plate>
    </>
  );
}
