import browserSync from "browser-sync";
import express from "express";

const isTest = process.env.ENV === "test";
const path = isTest ? "dist" : "src";
const PORT = 5000;

export const startServer = () => {
  const app = express();
  app.use(express.static(path));
  return app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
};

if (!isTest) {
  startServer();

  const sync = browserSync.create();
  sync.init({
    proxy: `localhost:${PORT}`,
    files: [`${path}/**/*.*`],
    port: PORT + 1,
  });
}
