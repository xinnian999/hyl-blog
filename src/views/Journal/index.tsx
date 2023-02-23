import { Outlet } from "react-router-dom";
import { PageCenter, Banner } from "@/components";

export default function Journal() {
  return (
    <>
      <Banner title="日 志" autograph="每天进步一点点" />
      <PageCenter>
        <Outlet />
      </PageCenter>
    </>
  );
}
