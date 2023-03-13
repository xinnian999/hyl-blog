import { createRoot } from "react-dom/client";
import { notification } from "antd";
import "animate.css";
import "@/style/global.scss";
import App from "./App";
import { flexible } from "@/utils";

flexible();

notification.config({
  placement: "topRight",
  top: 80,
  duration: 3,
  rtl: true,
});

document.addEventListener("copy", () => {
  var selecter = window.getSelection()?.toString();
  if (selecter) {
    return notification.success({
      message: "阁下，复制成功了！转载要记得标明出处哦～～",
      style: { top: "80px" },
    });
  }

  notification.error({
    message: "复制失败了，请勾选需要复制的内容哦",
  });
});

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
