"use strict";

var _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

var _require2 = require('process'),
    env = _require2.env;

var target = env.ASPNETCORE_HTTPS_PORT ? "https://localhost:".concat(env.ASPNETCORE_HTTPS_PORT) : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:20872';
var context = ["/weatherforecast", "/api/posts"];

module.exports = function (app) {
  var appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });
  app.use(appProxy);
};