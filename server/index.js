import express from "express";

const path = "dist";
const PORT = 5000;

export const startServer = () => {
  const app = express();
  app.use(express.static(path));
  return app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
};
