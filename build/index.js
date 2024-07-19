import esbuild from "esbuild";
import htmlMinifyPlugin from "esbuild-plugin-html-minify";

await esbuild.build({
  entryPoints: ["src/index.js", "src/index.css"],
  minify: true,
  outdir: "dist",
});

await esbuild.build({
  entryPoints: ["src/index.html", "src/404.html"],
  outdir: "dist",
  plugins: [htmlMinifyPlugin()],
});
