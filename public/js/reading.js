$.ajax({
  url: "/config.yaml",
  type: "GET",
  async: false,
  success(res) {
    window.globalConfig = jsyaml.load(res);
  },
});
