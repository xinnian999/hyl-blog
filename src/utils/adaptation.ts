const ratio = 54; // 根据项目配置比例的方式自行设定

const adaptation = (component: any) => {
  const template: string = component.componentStyle.rules[0];

  const newTemplate = template.replace(/\d+px/gm, (match) => {
    if (match === "800px") {
      return match;
    }
    return ~~((parseInt(match) / ratio) * 100) / 100 + "rem";
  });

  component.componentStyle.rules = [newTemplate];
};

export default adaptation;
