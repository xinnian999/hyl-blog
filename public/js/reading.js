var globalConfig;
const res = $.ajax({
  url: "globalConfig.json",
  type: "GET",
  dataType: "json",
  async: false,
});
globalConfig = JSON.parse(res.responseText);
