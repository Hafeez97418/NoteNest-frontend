import { defineConfig, loadEnv } from "vite";
import path from "path";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "./",
    root: path.resolve(__dirname, "src"),
    resolve: {
      alias: {
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      },
  };
});
