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
    "/qqAvatar",
    createProxyMiddleware({
      target: "https://thirdqq.qlogo.cn",
      changeOrigin: true,
      pathRewrite: { "^/qqAvatar": "" },
      secure: false,
    })
  );
};
