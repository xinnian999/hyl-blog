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
    "/cdn",
    createProxyMiddleware({
      target: "https://cdn.hyl999.co/public",
      changeOrigin: true,
      pathRewrite: { "^/cdn": "" },
      secure: false,
    })
  );
};
