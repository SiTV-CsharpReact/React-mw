import { defineConfig,loadEnv  } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
const env = loadEnv("", process.cwd());
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  
  optimizeDeps: {
    include: ['esm-dep > cjs-dep'],
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
  define: {
    // Chèn các biến môi trường vào cấu hình
    "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL_ACCOUNTS),
    "process.env.VITE_DEBUG": JSON.stringify(env.VITE_DEBUG),
  },
});
