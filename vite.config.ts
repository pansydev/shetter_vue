import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import graphql from "@rollup/plugin-graphql";

export default ({ mode }: { mode: string }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    plugins: [vue(), graphql()],
    resolve: {
      alias: {
        "@shetter": resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/graphql": {
          target: process.env.VITE_API_URL ?? "http://localhost:5000/graphql",
          changeOrigin: true,
          ws: true,
        },
      },
    },
  });
};
