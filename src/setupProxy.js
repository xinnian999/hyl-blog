const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.hyl999.co:7777",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      secure: false,
    })
  );

  app.use(
    "/qq",
    createProxyMiddleware({
      target: "https://graph.qq.com",
      changeOrigin: true,
      pathRewrite: { "^/qq": "" },
      secure: false,
    })
  );
};
