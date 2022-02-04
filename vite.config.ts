import { defineConfig } from "vite";
// @ts-ignore
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    lib: {
      entry: "src/my-element.ts",
      formats: ["es"],
    },
    manifest: true,
    rollupOptions: {
      input: {
        // @ts-ignore
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
