const r = (raw: TemplateStringsArray) => {
  return raw[0].replace(/\d+px/g, (m) => (parseInt(m) / 54).toFixed(2) + "rem");
};

export default r;
