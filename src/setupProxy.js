const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://port-0-back-17xqnr2llgv1tyhz.sel3.cloudtype.app/",
      changeOrigin: true,
    })
  );
};
