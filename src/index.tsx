import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { createRoot } from "react-dom/client";
import "@/style/style.scss";
// import "antd/dist/antd.variable.min.css";
// import "animate.css";
import App from "./App";
import "lib-flexible";
import reportWebVitals from "./reportWebVitals";
import { isIE, changeBlogTitle } from "@/utils";
import "@arco-design/web-react/dist/css/arco.css";

if (isIE()) {
  alert("请放弃万恶的IE浏览器吧");
}

window.onfocus = () => {
  changeBlogTitle(window.location.pathname);
};

// window.onblur = () => {
//   document.title = "心 念 · 客官~请留步";
// };

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

reportWebVitals();
