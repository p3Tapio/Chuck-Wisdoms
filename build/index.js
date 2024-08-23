import esbuild from "esbuild";
import htmlMinifyPlugin from "esbuild-plugin-html-minify";
import fs from "fs";
import path from "path";


await esbuild.build({
  entryPoints: ["src/index.js", "src/styles.css"],
  minify: true,
  outdir: "dist",
});

await esbuild.build({
  entryPoints: ["src/index.html", "src/404.html"],
  outdir: "dist",
  plugins: [htmlMinifyPlugin()],
});

fs.mkdirSync("dist/assets", { recursive: true });

fs.readdirSync("src/assets").forEach(file => {
  fs.copyFileSync(path.join("src/assets", file), path.join("dist/assets", file));
});
