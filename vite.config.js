import { defineConfig, loadEnv } from "vite";
import path from "path";
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "./",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      rollupOptions: {
        input: {
          login: path.resolve(__dirname, "src/login.html"),
          home: path.resolve(__dirname, "src/index.html"),
          register: path.resolve(__dirname, "src/register.html"),
          unauthorized: path.resolve(__dirname, "src/unauthorized.html"),
          admin: path.resolve(__dirname, "src/admin.html"),
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
    server: {
      port: 5500,
    },
  };
});
