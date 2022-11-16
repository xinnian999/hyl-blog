import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { createRoot } from "react-dom/client";
import "@/style/style.scss";
import "antd/dist/antd.variable.min.css";
import "animate.css";
import App from "./App";
import "lib-flexible";
import reportWebVitals from "./reportWebVitals";
import { isIE, changeBlogTitle } from "@/utils";
import "@arco-design/web-react/dist/css/arco.css";
import { message } from "antd";

if (isIE()) {
  alert("请放弃万恶的IE浏览器吧");
}

window.onfocus = () => {
  changeBlogTitle(window.location.pathname);
};

// window.onblur = () => {
//   document.title = "心 念 · 客官~请留步";
// };

document.addEventListener("copy", () => {
  var selecter = window.getSelection()?.toString();
  if (selecter) {
    return message.success("阁下，复制成功了！转载要记得标明出处哦～～");
  }

  message.error("复制失败了，请勾选内容哦");
});

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

reportWebVitals();
