import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "lib-flexible";
import { createRoot } from "react-dom/client";
import { notification } from "antd";
import "@/style/style.scss";
import { isIE } from "@/utils";
import "antd/dist/antd.variable.min.css";
import "animate.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@arco-design/web-react/dist/css/arco.css";
import "@/jquery/jquery-1.9.1.min";
import "@/jquery/jquery.lettering";
import "@/jquery/jquery.textillate";

if (isIE()) {
  alert("请放弃万恶的IE浏览器吧");
}

document.addEventListener("copy", () => {
  var selecter = window.getSelection()?.toString();
  if (selecter) {
    return notification.success({
      message: "阁下，复制成功了！转载要记得标明出处哦～～",
    });
  }

  notification.error({
    message: "复制失败了，请勾选需要复制的内容哦",
  });
});

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

reportWebVitals();
