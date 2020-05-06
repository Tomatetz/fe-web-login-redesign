const proxy = require("http-proxy-middleware");

const { REACT_APP_TARGET } = process.env;
const TARGET = REACT_APP_TARGET;

if (TARGET) {
  module.exports = (app) => {
    const apiProxyConfig = {
      pathRewrite: {},
      target: TARGET,
      secure: true,
      logLevel: "debug",
      changeOrigin: true,
    };

    // app.use(proxy("/0.1/auth/me", apiProxyConfig));
    // app.use(proxy("/0.1", apiProxyConfig));
    app.use(
      "/0.1",
      proxy({
        target: TARGET,
        changeOrigin: true,
      })
    );
  };
}
