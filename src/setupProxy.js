const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://port-0-back-17xqnr2llgv1tyhz.sel3.cloudtype.app/api",
      changeOrigin: true,
    })
  );
};