import { defineConfig } from "vite";
import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import graphql from "@rollup/plugin-graphql";

export default defineConfig({
  plugins: [vue(), graphql()],
  resolve: {
    alias: {
      "@shetter": resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:5000/graphql",
      },
    },
  },
});
