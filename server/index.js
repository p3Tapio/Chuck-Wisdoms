import express from "express";

const isTest = process.env.ENV === "test";
const path = isTest ? "dist" : "src";

export const startServer = () => {
  const app = express();
  app.use(express.static(path));
  const PORT = 5000;
  return app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
};

if (!isTest) {
  startServer();
}
