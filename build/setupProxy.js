const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  globalConfig.proxy.forEach(({ path, url }) => {
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
