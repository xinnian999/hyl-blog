const ratio = 54; // 根据项目配置比例的方式自行设定

const adaptation = (component) => {
  const template: string = component.componentStyle.rules[0];

  const newTemplate = template.replace(/\d+px/gm, (match) => {
    return parseInt(match) / ratio + "rem";
  });

  component.componentStyle.rules = [newTemplate];
  return component;
};
export default adaptation;
