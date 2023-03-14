const ratio = 54; // 根据项目配置比例的方式自行设定
const ignore = ["screen", "text-shadow", "box-shadow"]; // 需要排除转换的样式

const ignoreReg = ignore.reduce((str, item) => {
  return str + "|" + item;
});
const adaptation = (component: any) => {
  const template: string = component.componentStyle.rules[0];

  const newTemplate = template.replace(/.*\d+px\)?/gm, (match) => {
    if (new RegExp(ignoreReg).test(match)) {
      return match;
    }
    // 其他所有px转化为rem
    return match.replace(
      /\d+px/g,
      (m) => (parseInt(m) / ratio).toFixed(2) + "rem"
    );
  });

  component.componentStyle.rules = [newTemplate];
};

export default adaptation;
