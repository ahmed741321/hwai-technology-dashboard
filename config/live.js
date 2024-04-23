const path = require("path");
const livereload = require("livereload");

const configureLivereload = (app) => {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "public"));

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  const connectLivereload = require("connect-livereload");
  app.use(connectLivereload());
};

module.exports = { configureLivereload };
