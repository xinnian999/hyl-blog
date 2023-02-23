import { Outlet } from "react-router-dom";
import { PageCenter, Banner } from "@/components";

export default function Resource() {
  return (
    <>
      <Banner
        title="作 品"
        autograph="尽量的学习,尽量的尽力,尽量的旅游,尽量的吃好东西,人生就比较美好一点,就是这么简单"
      />
      <PageCenter>
        <Outlet />
      </PageCenter>
    </>
  );
}
