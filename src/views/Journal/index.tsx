import { Outlet } from "react-router-dom";
import { PageCenter, Banner } from "@/components";
import "./style.scss";

export default function Journal(props: any) {
  return (
    <>
      <Banner
        title="日 志"
        autograph="每天进步一点点"
        twoRouter={props.twoRouter}
      />
      <PageCenter>
        <Outlet />
      </PageCenter>
    </>
  );
}
