import http from "http";
import fs from "fs";
const PORT = 5000;

export function startServer() {
  const server = http.createServer((req, res) => {
    try {
      res.statusCode = 200;

      fs.readFile("dist/index.html", function (err, data) {
        if (err) {
          return console.error(err);
        }
        res.end(data);
      });
    } catch (e) {
      console.error(e);
    }
  });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });

  return server;
}
