import "lib-flexible";
import { createRoot } from "react-dom/client";
import { notification } from "antd";
import "antd/dist/antd.variable.min.css";
import "animate.css";
import "@arco-design/web-react/dist/css/arco.css";
import "./jquery.lettering";
import "./jquery.textillate";
import "@/style/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

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
