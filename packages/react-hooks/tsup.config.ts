import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: false,
  replaceNodeEnv: false,
  clean: true,
  minify: !options.watch,
}));
