import { message } from "antd";

const copy = (str: string) => {
  var input = document.createElement("textarea");
  document.body.appendChild(input);
  input.value = str;
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    message.success("殿下，复制成功了，去粘贴吧！");
  }
  document.body.removeChild(input);
};

export default copy;
