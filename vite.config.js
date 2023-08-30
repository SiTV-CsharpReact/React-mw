import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ['esm-dep > cjs-dep'],
  },
  server: {
    host: 'eztradereact.fpts.com.vn'
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext", // Đối tượng JavaScript mục tiêu (browserslist)
    outDir: "dist", // Thư mục đầu ra của build
    assetsDir: "assets", // Thư mục chứa các tài sản (hình ảnh, font chữ, ...)
    sourcemap: true, // Tạo sourcemap cho mã đầu ra
  },
});
