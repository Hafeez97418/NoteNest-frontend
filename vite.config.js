import { defineConfig, loadEnv } from "vite";
import path from "path";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "./",
    build: {
      rollupOptions: {
        input: {
          login: path.resolve(__dirname, "src/login.html"),
          home: path.resolve(__dirname, "src/index.html"),
          register: path.resolve(__dirname, "src/register.html"),
        },
      },
    },
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
