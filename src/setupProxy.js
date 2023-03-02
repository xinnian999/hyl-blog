const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../public/globalConfig.json");

module.exports = function (app) {
  config.proxy.forEach(({ path, url }) => {
    app.use(
      path,
      createProxyMiddleware({
        target: url,
        changeOrigin: true,
        pathRewrite: { [`^${path}`]: "" },
        secure: false,
      })
    );
  });
};
