import { Outlet } from "react-router-dom";
import { Plate } from "@/components";

export default function Resource() {
  return (
    <>
      <Plate
        title="作品"
        autograph="尽量的学习,尽量的尽力,尽量的旅游,尽量的吃好东西,人生就比较美好一点,就是这么简单"
      >
        <Outlet />
      </Plate>
    </>
  );
}
