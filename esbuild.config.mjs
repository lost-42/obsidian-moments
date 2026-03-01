import esbuild from "esbuild";

const isDev = process.argv[2] === "dev";

const context = await esbuild.context({
  entryPoints: ["main.ts"],
  bundle: true,
  external: ["obsidian"],
  format: "cjs",
  platform: "node",
  target: "es2018",
  sourcemap: isDev ? "inline" : false,
  logLevel: "info",
  outfile: "main.js"
});

if (isDev) {
  await context.watch();
  console.log("Watching for changes...");
} else {
  await context.rebuild();
  await context.dispose();
}
