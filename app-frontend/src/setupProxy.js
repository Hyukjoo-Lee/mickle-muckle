const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/user',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    }),
  );

  app.use(
    '/codef',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    }),
  );
  app.use(
    '/email',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    }),
  );

  app.use(
    '/community',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    }),
  );

  app.use(
    '/notice',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL,
      changeOrigin: true,
    }),
  );
};
