import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    server: {
      proxy: {
        '/api': 'https://openapi.zalo.me', 
      }
    },
    root: "./src",
    base: "",
    plugins: [zaloMiniApp(), react()],
  });
};
