const ratio = 54; // 根据项目配置比例的方式自行设定
const ignore = ["text-shadow", "box-shadow", "border"]; // 需要排除转换的样式

const r = (str: string) => {
  return str.replace(/.*\d+px.*/gm, (match) => {
    if (match.includes("screen")) return match;

    if (ignore.includes(match.trimStart().split(":")[0])) {
      return match;
    }

    return match.replace(
      /\d+px/g,
      (m) => (parseInt(m) / ratio).toFixed(2) + "rem"
    );
  });
};

const adaptation = (component: any) => {
  const style = component.componentStyle.rules.map((item) => {
    if (typeof item === "function") {
      let fn;
      eval(`fn=${r(item.toString())}`);

      return fn;
    }

    return r(item);
  });

  component.componentStyle.rules = style;
};

export default adaptation;